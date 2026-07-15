package main

import (
	"fmt"
	"log"
	"strings"
)

func main() {
	separator := strings.Repeat("=", 60)
	fmt.Println(separator)
	fmt.Println("Running make_data_key...")
	fmt.Println(separator)
	if err := MakeKey(); err != nil {
		log.Fatalf("MakeKey failed: %v", err)
	}
	fmt.Println(separator)
	fmt.Println("Running insert_encrypted_document...")
	fmt.Println(separator)
	if err := Insert(); err != nil {
		log.Fatalf("Insert failed: %v", err)
	}
	fmt.Println(separator)
	fmt.Println("All scripts completed successfully!")
	fmt.Println(separator)
}
