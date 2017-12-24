package main

import (
	"html/template"
	"log"
	"net/http"
	"os"
)

// Info -- user information
type Info struct {
	username  string
	password  string
	email     string
	telephone string
}

func main() {
	h := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", h)) // 启动静态文件服务
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8181", nil)
}

// PathExist judge the path exist or not
func PathExist(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}

func handler(w http.ResponseWriter, r *http.Request) {
	if r.URL.RequestURI() == "/" {
		load(w, r)
	} else {
		notFound(w, r)
	}
}

// The Path doesn't exist
func notFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html;charset=gb2312")
	w.Write([]byte("5xx Unknow page \"" + r.URL.RequestURI() + "\" access"))
	w.WriteHeader(505)
}

// The Path exist
func load(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		Template, err := template.ParseFiles("index.html", "public/header.html", "public/footer.html")
		if err != nil {
			log.Fatal(err)
		}

		data := struct {
			Title string
		}{
			Title: "Register Page",
		}

		err = Template.Execute(w, data)

		if err != nil {
			log.Fatal(err)
		}
	} else if r.Method == "POST" {
		err := r.ParseForm()
		if err != nil {
			panic(err)
		}

		username := r.PostForm.Get("username")
		password := r.PostForm.Get("password")
		email := r.PostForm.Get("email")
		telephone := r.PostForm.Get("telephone")

		var isUsernameExisted, isPasswordExisted = false, false
		var isEmailExisted, isTelephoneExisted = false, false

		if username != "" {
			isUsernameExisted = true
		}
		if password != "" {
			isPasswordExisted = true
		}
		if email != "" {
			isEmailExisted = true
		}
		if telephone != "" {
			isTelephoneExisted = true
		}

		if isUsernameExisted && isPasswordExisted && isEmailExisted && isTelephoneExisted {
			/*fout, err := os.OpenFile("./data/data.txt", os.O_RDWR|os.O_APPEND, os.ModePerm)
			if err != nil {
				fmt.Println(err.Error())
			} else {
				var userInfo Info

				buffwriter := bufio.NewWriter(fout)

				userInfo = Info{username, password, email, telephone}

				fmt.Println(userInfo)
				result, err1 := json.Marshal(userInfo)

				fmt.Println(result, err1.Error())

				if err1 == nil {
					fmt.Println("yes")
					buffwriter.Write(result)
					buffwriter.WriteString("\n")
					buffwriter.Flush()
				}


			}*/
			w.Header().Set("Content-Type", "charset=gb2312;text/html")
			w.Write([]byte("Congratiation! " + username + " exists now."))
		}
	}
}
