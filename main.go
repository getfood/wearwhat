package wtw

import (
	"fmt"
	"net/http"
	"strings"
	"encoding/json"
	"log"
	"io/ioutil"

	"appengine"
	"appengine/urlfetch"
)

func init() {
	http.Handle("/robots.txt", http.StripPrefix("/", http.FileServer(http.Dir("www"))))
	http.Handle("/www/", http.StripPrefix("/www/", http.FileServer(http.Dir("www"))))
	http.Handle("/img/", http.FileServer(http.Dir("www")))
	http.Handle("/css/", http.FileServer(http.Dir("www")))
	http.Handle("/js/", http.FileServer(http.Dir("www")))
	http.Handle("/m/", http.StripPrefix("/www/", http.FileServer(http.Dir("www"))))
	http.HandleFunc("/weather/", ForecastHandler)
	http.Handle("/", http.FileServer(http.Dir("www")))
}

type ForecastResponseData struct {
	ErrMsg string `json:",omitempty"`
	ForecastData string `json:",omitempty"`
}

func ForecastHandler(w http.ResponseWriter, r *http.Request) {
	var forecastIoUri = "https://api.forecast.io/forecast/bf8c70bf3166728ce9a41fec8aa3bbfb/"
	resData := &ForecastResponseData{}
	qParams := strings.Split(r.URL.String(), "/weather/")
	if len(qParams) < 2 {
		resData.ErrMsg = "Invalid Request"
	} else {
		//todo: cache
		res, e := Pull(r, forecastIoUri + qParams[1])
		if e != nil {
			resData.ErrMsg = e.Error()
		} else {
			resData.ForecastData = string(res)
		}
	}

	if len(resData.ErrMsg) > 0 {
		s, _ := ToJson(resData)
		fmt.Fprint(w, s)
	} else {
		fmt.Fprint(w, resData.ForecastData)
	}
}

func ToJson(data interface{}) (string, error) {
	d, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return "", err
	} else {
		return string(d), nil
	}
}

func Pull(r *http.Request, url string) (resContent []byte, e error) {
  //client := &http.Client{}
	c := appengine.NewContext(r)
  client := urlfetch.Client(c)

  req, err := http.NewRequest("GET", url, nil)
  if err != nil {
    log.Printf("[HTTP] Failed to build outbound request from %s: %v", url, err)
    e = err
    return
  }

  req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36")
  log.Printf("Pulling URL %s", url)
  if resp, err := client.Do(req); err == nil {
    defer resp.Body.Close()
    if resContent, e = ioutil.ReadAll(resp.Body); e != nil {
      log.Printf("[HTTP] Failed to read response from %s: %v", url, e)
    }
  } else {
    e = err
    log.Printf("[HTTP] Failed to get URL %s: %v", url, err)
  }

  return
}
