from .db import db, environment, SCHEMA, add_prefix_for_prod

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    sent_at = db.Column(db.String(100), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'senderId': self.sender_id,
            'recieverId': self.recipient_id
        }
