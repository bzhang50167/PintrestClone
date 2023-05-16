from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    text = db.Column(db.String(255), nullable=False)

    users = db.relationship(
        'User',
        back_populates='comments'
    )

    posts = db.relationship(
        'Post',
        back_populates='comments'
    )


    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.post_id,
            'userId': self.user_id,
            'text': self.text,
            'rating': self.rating,
            'user': self.users.to_dict()
        }
