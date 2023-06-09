from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follows import follows

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    profile_pic = db.Column(db.String(255))

    posts = db.relationship(
        'Post',
        back_populates='users'
    )

    comments = db.relationship(
        'Comment',
        back_populates='users'
    )

    groups = db.relationship(
        'Group',
        back_populates='users'
    )
    followers = db.relationship(
        'User',
        secondary='follows',
        primaryjoin=follows.columns.follower == id,
        secondaryjoin=follows.columns.followed == id,
        back_populates='following'
    )
    following = db.relationship(
        'User',
        secondary='follows',
        primaryjoin=follows.columns.followed == id,
        secondaryjoin=follows.columns.follower == id,
        back_populates='followers'
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profilePic': self.profile_pic,
            'followers': [follower.id for follower in self.followers],
            'following': [followed.id for followed in self.following]
        }
