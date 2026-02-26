from datetime import datetime
from bson.objectid import ObjectId

class Post:
    def __init__(self, title, content, date_posted=None, 
                 _id=None):
        self.title = title
        self.content = content
        self.date_posted = date_posted if date_posted \
                           else datetime.utcnow()
        self._id = _id if _id else ObjectId()

    def to_dict(self):
        return {
            "title": self.title,
            "content": self.content,
            "date_posted": self.date_posted,
            "_id": self._id
        }

    @staticmethod
    def from_dict(data):
        return Post(
            title=data.get('title'),
            content=data.get('content'),
            date_posted=data.get('date_posted'),
            _id=data.get('_id')
        )

    def __repr__(self):
        return f"Post('{self.title}', \
                '{self.date_posted}')"
