from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text
import random

def seed_comments(seeded_users, seeded_post):
    comments_data = [
        {"text":"In sagittis dui vel nisl. Duis ac nibh."},
        {"text":"Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis."},
        {"text":"Aenean auctor gravida sem."},
        {"text":"Ut at dolor quis odio consequat varius. Integer ac leo."},
        {"text":"Etiam pretium iaculis justo."},
        {"text":"Duis mattis egestas metus."},
        {"text":"Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia."},
        {"text":"In hac habitasse platea dictumst. Etiam faucibus cursus urna."},
        {"text":"In quis justo. Maecenas rhoncus aliquam lacus."},
        {"text":"Morbi non quam nec dui luctus rutrum. Nulla tellus."},
        {"text":"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam."},
        {"text":"In hac habitasse platea dictumst."},
        {"text":"In sagittis dui vel nisl."},
        {"text":"Fusce posuere felis sed lacus."},
        {"text":"Morbi a ipsum."},
        {"text":"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus."},
        {"text":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue."},
        {"text":"Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla."},
        {"text":"Morbi porttitor lorem id ligula."},
        {"text":"Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."},
        {"text":"Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula."},
        {"text":"Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."},
        {"text":"Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti."},
        {"text":"Sed ante."},
        {"text":"Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."},
        {"text":"Pellentesque eget nunc."},
        {"text":"Vivamus vestibulum sagittis sapien."},
        {"text":"Proin at turpis a pede posuere nonummy."},
        {"text":"Suspendisse accumsan tortor quis turpis."},
        {"text":"Vivamus in felis eu sapien cursus vestibulum. Proin eu mi."},
        {"text":"In sagittis dui vel nisl. Duis ac nibh."},
        {"text":"Donec semper sapien a libero. Nam dui."},
        {"text":"Cras in purus eu magna vulputate luctus."},
        {"text":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio."},
        {"text":"Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."},
        {"text":"Aenean fermentum. Donec ut mauris eget massa tempor convallis."},
        {"text":"Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc."},
        {"text":"Nunc rhoncus dui vel sem."},
        {"text":"Ut at dolor quis odio consequat varius. Integer ac leo."},
        {"text":"Sed sagittis."},
        {"text":"Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede."},
        {"text":"Vivamus tortor."},
        {"text":"Pellentesque viverra pede ac diam."},
        {"text":"Proin risus."},
        {"text":"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante."},
        {"text":"In hac habitasse platea dictumst."},
        {"text":"Etiam vel augue."},
        {"text":"Etiam justo. Etiam pretium iaculis justo."},
        {"text":"Cras in purus eu magna vulputate luctus."},
        {"text":"In congue. Etiam justo."},
        {"text":"Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante."},
        {"text":"Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."},
        {"text":"Pellentesque at nulla. Suspendisse potenti."},
        {"text":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst."},
        {"text":"Nulla justo. Aliquam quis turpis eget elit sodales scelerisque."},
        {"text":"Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus."},
        {"text":"Integer ac neque. Duis bibendum."},
        {"text":"Cras pellentesque volutpat dui."},
        {"text":"Suspendisse accumsan tortor quis turpis."},
        {"text":"Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla."},
        {"text":"Quisque id justo sit amet sapien dignissim vestibulum."},
        {"text":"Suspendisse accumsan tortor quis turpis."},
        {"text":"Aliquam erat volutpat."},
        {"text":"Nullam varius."},
        {"text":"Nulla facilisi. Cras non velit nec nisi vulputate nonummy."},
        {"text":"Nam tristique tortor eu pede."},
        {"text":"In blandit ultrices enim."},
        {"text":"Duis aliquam convallis nunc."},
        {"text":"Aenean fermentum. Donec ut mauris eget massa tempor convallis."},
        {"text":"Ut at dolor quis odio consequat varius. Integer ac leo."},
        {"text":"Pellentesque at nulla."},
        {"text":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio."},
        {"text":"Mauris sit amet eros."},
        {"text":"Integer ac leo. Pellentesque ultrices mattis odio."},
        {"text":"In congue."},
        {"text":"Maecenas pulvinar lobortis est. Phasellus sit amet erat."},
        {"text":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est."},
        {"text":"Nulla nisl."},
        {"text":"Nulla facilisi. Cras non velit nec nisi vulputate nonummy."},
        {"text":"Pellentesque viverra pede ac diam."},
        {"text":"Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue."},
        {"text":"In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat."},
        {"text":"Donec semper sapien a libero. Nam dui."},
        {"text":"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem."},
        {"text":"Vivamus in felis eu sapien cursus vestibulum."},
        {"text":"Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo."},
        {"text":"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci."},
        {"text":"In hac habitasse platea dictumst."},
        {"text":"Nulla nisl."},
        {"text":"Nunc purus."},
        {"text":"Nulla mollis molestie lorem. Quisque ut erat."},
        {"text":"Aenean lectus. Pellentesque eget nunc."},
        {"text":"Nullam varius. Nulla facilisi."},
        {"text":"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis."},
        {"text":"Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo."},
        {"text":"Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."},
        {"text":"Phasellus sit amet erat. Nulla tempus."},
        {"text":"Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet."},
        {"text":"In hac habitasse platea dictumst."},
        {"text":"Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat."},
        {"text":"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio."},
        {"text":"Proin leo odio, porttitor id, consequat in, consequat ut, nulla."},
        {"text":"Suspendisse ornare consequat lectus."},
        {"text":"Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo."},
        {"text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
        {"text":"Curabitur convallis."},
        {"text":"Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."},
        {"text":"Vivamus vel nulla eget eros elementum pellentesque."},
        {"text":"Nullam varius."},
        {"text":"Nam nulla."},
        {"text":"Donec posuere metus vitae ipsum. Aliquam non mauris."},
        {"text":"Maecenas rhoncus aliquam lacus."},
        {"text":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."},
        {"text":"Donec dapibus."},
        {"text":"Sed accumsan felis. Ut at dolor quis odio consequat varius."},
        {"text":"Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."},
        {"text":"Nullam varius."},
        {"text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices."},
        {"text":"Duis at velit eu est congue elementum. In hac habitasse platea dictumst."},
        {"text":"Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."}
    ]

    all_comments = []
    for comment_data in comments_data:
        comment = Comment(
            posts=random.choice(seeded_post),
            users=random.choice(seeded_users),
            text=comment_data["text"]
        )
        all_comments.append(comment)
        db.session.add(comment)

    db.session.commit()
    return all_comments

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM comments')
        )
    db.session.commit()
