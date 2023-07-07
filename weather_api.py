import requests

# WeatherAPI.com API key
api_key = "53d9d4c7bd2e4db38c3122822230707"  # Replace with your WeatherAPI.com API key

# Base URL for WeatherAPI.com
base_url = "http://api.weatherapi.com/v1"

# Function to fetch weather data for a specific location
def fetch_weather_data(location):
    # API endpoint for current weather conditions
    endpoint = f"{base_url}/current.json?key={api_key}&q={location}"
    
    try:
        # Send GET request to the API
        response = requests.get(endpoint)
        
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON response
            data = response.json()
            
            # Extract relevant weather details
            current_temp = data["current"]["temp_c"]
            humidity = data["current"]["humidity"]
            weather_condition = data["current"]["condition"]["text"]
            
            # Display the weather information
            print(f"Weather in {location}:")
            print(f"Temperature: {current_temp}°C")
            print(f"Humidity: {humidity}%")
            print(f"Condition: {weather_condition}")
            
        else:
            # Display an error message if the request was unsuccessful
            print("Error: Unable to fetch weather data.")
    
    except requests.exceptions.RequestException as e:
        # Display an error message if there was a network error
        print("Error: Network connection error.")
        print(e)

# Usage: Call the fetch_weather_data function with the desired location
fetch_weather_data("London")
