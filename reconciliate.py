import unicodecsv as csv
from pymongo import MongoClient
import pprint

def main():
  skip = 0

  client = MongoClient()
  db = client.localytics

  logs = db.tokens
  # logs.create_index({"advertising_id": 1})
  # logs.create_index({"device_uuid": 1})

  tokens = db.users
  # tokens.create_indexes({"Advertising_id": 1})
  # tokens.create_indexes({"Device_uuid": 1})

  header = [
    'push_token', # tokens.push_id
    'advertising_id', # join key
    'hardware_id', # logs.device_uuid
    'email', # logs...
    'language', # logs.language
    'platform', # logs.platform
    'os_version', # logs.os_ver
    'app_version', # logs.app_ver
    'timezone' # logs.device_timezone
  ];

  with open('final.csv', 'wb' if skip == 0 else 'ab') as f: #wb
    writer = csv.writer(f, delimiter=';')

    if skip == 0:
      writer.writerow(header)

    total = tokens.count()
    i = skip
    for token in tokens.find().skip(skip):
      i+=1
      log = logs.find_one(
        {"$or": [
          {"advertising_id": token['Advertising_id']},
          {"device_uuid": token['Device_uuid']},
        ]}
      )
      if log:

        default = {
          'device_uuid': '',
          'customer_ids': {'email': ''},
          'language': '',
          'platform': '',
          'os_ver': '',
          'app_ver': '',
          'device_timezone': ''
        }
        default.update(log)

        try:
          default['customer_ids']['email']
        except Exception as e:
          default['customer_ids']['email'] = None


        data = [
          token['Push_id'],
          token['Advertising_id'],
          token['Device_uuid'],
          default['customer_ids']['email'],
          default['language'],
          default['platform'],
          default['os_ver'],
          default['app_ver'],
          default['device_timezone']
        ];
        writer.writerow(data)
      
      print str(i) + '/' + str(total)

main()
