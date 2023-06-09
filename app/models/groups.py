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
        'Post',
        secondary=group_posts,
        back_populates='posts_groups'
    )

    users = db.relationship(
        'User',
        back_populates='groups'
    )

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'userId': self.user_id,
            'groupPost': [post.to_dict() for post in self.group_posts]
        }
