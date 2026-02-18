#!/bin/bash

BASE_URL="${BETTER_AUTH_URL:'http://localhost:3000'}"
echo "Creating categories..."
curl -X POST $BASE_URL/categories -H "Content-Type: application/json" -d '{"name": "Electronics"}'
curl -X POST $BASE_URL/categories -H "Content-Type: application/json" -d '{"name": "Books"}'
curl -X POST $BASE_URL/categories -H "Content-Type: application/json" -d '{"name": "Clothing"}'
curl -X POST $BASE_URL/categories -H "Content-Type: application/json" -d '{"name": "Home & Garden"}'
echo -e "\n\nCreating items..."
curl -X POST $BASE_URL/items -H "Content-Type: application/json" -d '{
 "name": "MacBook Pro 16-inch",
 "description": "Powerful laptop with M3 chip",
 "link": "https://www.apple.com/macbook-pro/",
 "photoLink": "https://example.com/macbook.jpg"
}'
curl -X POST $BASE_URL/items -H "Content-Type: application/json" -d '{
 "name": "The Pragmatic Programmer",
 "description": "Classic programming book",
 "link": "https://pragprog.com/titles/tpp20/",
 "photoLink": "https://example.com/book.jpg"
}'
curl -X POST $BASE_URL/items -H "Content-Type: application/json" -d '{
 "name": "Keychron K8 Pro",
 "description": "Wireless mechanical keyboard",
 "link": "https://www.keychron.com/",
 "photoLink": "https://example.com/keyboard.jpg"
}'
echo -e "\n\nFetching all data..."
echo "Categories:"
curl -s $BASE_URL/categories | jq
echo -e "\nItems:"
curl -s $BASE_URL/items | jq
