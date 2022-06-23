package main

import (
	"log"
)

func main() {
	err := MakeKey()
	if err != nil {
		log.Fatal(err)
	}
	err = Insert()
	if err != nil {
		log.Fatal(err)
	}

}
