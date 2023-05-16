from .db import db, environment, SCHEMA, add_prefix_for_prod

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))


    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'postId': self.post_id,
            'userId': self.user_id
        }
