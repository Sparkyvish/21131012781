import requests
url = "http://20.244.56.144/test/auth"
payload = {
    'companyName': 'BigLearning',
    'clientID': '49bb1204-0251-48f9-9731-dc5d6c4febee',
    'clientSecret':'xxhiIsSuNlzwCBfJ',
    'ownerName':'Vishal Bahadur',
    'ownerEmail': 'sparkyvish55@gmail.com',
    'rollNo':'21SCSE1011402'
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    token = response.json().get("token")
    print("Authorization Token:", token)
else:
    print("Error:", response.status_code, response.text)