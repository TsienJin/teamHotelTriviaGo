from pymongo import MongoClient


def connect_db():
    client = MongoClient(
        "mongodb+srv://Hotel_Trivia_Go:HotelTriviaGo@cluster0.jnnd9.mongodb.net/myFirstDatabase"
    )
    db = client['myFirstDatabase']
    return db

def connect_collection(db):
    mdna_collection = db['mdna']
    return mdna_collection

def insert_item(mdna_collection, item):
    temp = mdna_collection.insert_one(item)
    print(temp)
