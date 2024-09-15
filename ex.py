

import requests

# Your API key
APIkey = '3a0c11b52ee46ad518aa1cfcf564cec7'

# API endpoint (replace with the specific API you're using)
url = 'https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=f"{APIkey}"'



# Send the GET request to the API
response = requests.get(url)

# Check the response status code
if response.status_code == 200:
    print('API key is working!')
else:
    print('Failed to connect. Status code:', response.status_code)
    print('Response:', response.json())  # Print the response for debugging

url="https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid='3a0c11b52ee46ad518aa1cfcf564cec7'"
response = requests.get(url) 
print(response.text)