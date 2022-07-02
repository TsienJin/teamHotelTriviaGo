from pymongo import MongoClient
import os


def connect_db():
    print(os.environ.get('MONGO_URI'))
    client = MongoClient(
       os.environ.get('MONGO_URI')
    )
    db = client['HotelTriviaGodb']
    return db


def connect_collection(db):
    mdna_collection = db['mdna_test']
    return mdna_collection


def insert_item(mdna_collection, item):
    temp = mdna_collection.insert_one(item)
    print(temp)
