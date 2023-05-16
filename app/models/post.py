from .db import db, environment, SCHEMA, add_prefix_for_prod
from .group_post import group_posts

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    text = db.Column(db.String(255))
    image_url = db.Column(db.String(255))

    users = db.relationship(
        'Users',
        back_populates='posts'
    )

    comments = db.relationship(
        'Comments',
        back_populates='posts'
    )

    posts_groups = db.relationship(
        'Groups',
        secondary=group_posts,
        back_populates='posts_groups'
    )

    def to_dict(self):
        return{
            'id': self.id,
            'userId': self.user_id,
            'text': self.text,
            'imageUrl': self.text
        }
