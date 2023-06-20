from app.models import db, User, environment, SCHEMA, Post
from sqlalchemy.sql import text

def seed_posts(seeded_user):
    all_post = []

    image_urls = [
        'https://mangterest-pic.s3.amazonaws.com/fd47bb7fd9b04ca69f80933041cfedc8.jpg',
        'https://mangterest-pic.s3.amazonaws.com/c97fb9c403164b988266c17f29793f0d.jpg',
        'https://mangterest-pic.s3.amazonaws.com/a9b341090b0a41ccb93d245c423788eb.jpg',
        'https://mangterest-pic.s3.amazonaws.com/f2f9fbb717584986bf9d9f9ab7a502ed.jpg',
        'https://mangterest-pic.s3.amazonaws.com/300d94574cf14b368ff49b1af5e30104.jpg',
        'https://mangterest-pic.s3.amazonaws.com/669bbd26be524dbfad2d0c3b9619156f.jpg',
        'https://mangterest-pic.s3.amazonaws.com/a302179367eb44eda3cf5574d2a2afff.jpg',
        'https://mangterest-pic.s3.amazonaws.com/9ba322e05964410a84c0c08c2aab7658.jpg',
        'https://mangterest-pic.s3.amazonaws.com/64194d6c1e784aeab3d87d0d06c6b91e.jpg',
        'https://mangterest-pic.s3.amazonaws.com/825ad4f1989047e986ba110f47d28903.png',
        'https://mangterest-pic.s3.amazonaws.com/652e7d2b5d074a4baee5ba92b5ff21bd.jpg',
        'https://mangterest-pic.s3.amazonaws.com/7416f0ac86b1465ebfde28065041e4c5.jpg',
        'https://mangterest-pic.s3.amazonaws.com/53d7393483f94ed8aa45ab6ba4b0616c.jpg',
        'https://mangterest-pic.s3.amazonaws.com/a488e69447a240d3832c9184ccd8c37f.jpg',
        'https://mangterest-pic.s3.amazonaws.com/10cfafc5319b4f9ebf2ba7430483207e.jpg',
        'https://mangterest-pic.s3.amazonaws.com/c3bd894ee3bc4856b95fb53a5a744d88.jpg',
        'https://mangterest-pic.s3.amazonaws.com/e0c31739011b474e9666709692cfadad.jpg',
        'https://mangterest-pic.s3.amazonaws.com/8697137a122c47e294aad61475782995.jpg',
        'https://mangterest-pic.s3.amazonaws.com/284d1a0ecbb34abba6e4516ba8014929.jpg',
        'https://mangterest-pic.s3.amazonaws.com/e7fb1e87e2514866968ed20b09c05493.jpg',
        'https://mangterest-pic.s3.amazonaws.com/5a5f64b3924f4990b576557394be0962.jpg',
        'https://mangterest-pic.s3.amazonaws.com/dd9dc04cf9824f8291aab60c53b989c7.jpg',
        'https://mangterest-pic.s3.amazonaws.com/9604ec51c92b4ef6aa3a46e2afd7fdc4.jpg',
        'https://mangterest-pic.s3.amazonaws.com/11109d2e46ec49e2b8ca2eaa57bb3f86.jpg',
        'https://mangterest-pic.s3.amazonaws.com/59dce6e6c16e443287d027ccf675dc66.jpg',
        'https://mangterest-pic.s3.amazonaws.com/d1cda04c2c704dc18c907a7e6c943931.jpg',
        'https://mangterest-pic.s3.amazonaws.com/4a0a049e6a5d42cdb9fd4d6270757d99.jpg',
        'https://mangterest-pic.s3.amazonaws.com/4edf6a95c9794eed9cc15330095feba9.jpg',
        'https://mangterest-pic.s3.amazonaws.com/561f554364ee4ede897bb972f2ed0c09.jpg'
    ]

    titles = [
        'the PROMISED NEVERLAND',
        'EIGHTY SIX',
        'Violet Evergarden',
        'Violet Evergarden',
        'Vanidasu',
        'Black Butler',
        'SPY ROOM',
        'One Piece',
        'Pandora Hearts',
        'Owari no Seraph',
        'Oshi no Ko',
        'One Piece',
        'Rental Girlfriend',
        'Lycoris Recoil',
        'Spy x Family',
        'Code Geass',
        'Kage no jitsuryokusha',
        'Hanako-kun',
        'xxxHolic',
        'Hyouka',
        'Horimiya',
        'Quintessential Quintuplets',
        'Fate Requiem',
        'CardCaptor Sakura',
        'Bunko Stray Dogs',
        'Bocchi the Rock',
        'Shimasuri',
        'Fate',
        'Black Butler'
    ]

    for i in range(70):
        post = Post(
            users=seeded_user[i % len(seeded_user)],
            text=f'Sample post {i+1}!!!!',
            title=titles[i % len(titles)],
            image_url=image_urls[i % len(image_urls)]
        )
        all_post.append(post)

    add_post = [db.session.add(post) for post in all_post]
    db.session.commit()

    return all_post



def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(
            text('DELETE FROM posts')
        )
    db.session.commit()
