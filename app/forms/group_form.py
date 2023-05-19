from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class GroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    user_id = IntegerField('user Id', validators=[DataRequired()])
