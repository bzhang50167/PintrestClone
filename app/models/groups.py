from .db import db, environment, SCHEMA, add_prefix_for_prod
from .group_post import group_posts

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    group_posts = db.relationship(
        'Posts',
        secondary=group_posts,
        back_populates='group_posts'
    )

    users = db.relationship(
        'Users',
        back_populates='groups'
    )

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'postId': self.post_id,
            'userId': self.user_id
        }
