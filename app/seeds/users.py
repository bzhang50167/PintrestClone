from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
import random


# Adds a demo user, you can add other users here if you want
def seed_users():
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
    users_data = [
        {"username": "Demo","email":'demo@aa.io',"password":'password',"first_name":'Demo',"last_name":'Lition'},
        {"username":"cpagin0","first_name":"Coop","last_name":"Pagin","email":"cpagin0@adobe.com","password":"wL0~b\\c\\M9"},
        {"username":"omower1","first_name":"Obie","last_name":"Mower","email":"omower1@statcounter.com","password":"hO2$$(Kj(G2_t&N"},
        {"username":"icallard2","first_name":"Ileana","last_name":"Callard","email":"icallard2@ucoz.ru","password":"yM3`!GV.'q8dvsJ"},
        {"username":"bthresh3","first_name":"Brandi","last_name":"Thresh","email":"bthresh3@huffingtonpost.com","password":"sV6<Ik/$"},
        {"username":"cboote4","first_name":"Cristie","last_name":"Boote","email":"cboote4@webnode.com","password":"hA8#LI<xHLb,"},
        {"username":"hbrittles5","first_name":"Honey","last_name":"Brittles","email":"hbrittles5@oaic.gov.au","password":"tB2_Y/Q6M="},
        {"username":"eendrizzi6","first_name":"Elwood","last_name":"Endrizzi","email":"eendrizzi6@google.com.au","password":"nC0|B3g&tJ"},
        {"username":"clangran7","first_name":"Catrina","last_name":"Langran","email":"clangran7@cnbc.com","password":"tZ3=cxb'$"},
        {"username":"omalicki8","first_name":"Olly","last_name":"Malicki","email":"omalicki8@blogtalkradio.com","password":"uI7#2)'k4C!+"},
        {"username":"mbuxton9","first_name":"Meyer","last_name":"Buxton","email":"mbuxton9@nationalgeographic.com","password":"cF3'G#z4"},
        {"username":"hvoasea","first_name":"Helga","last_name":"Voase","email":"hvoasea@soup.io","password":"mM3(J&ozm#}_Ly"},
        {"username":"adolleb","first_name":"Allistir","last_name":"Dolle","email":"adolleb@google.es","password":"bN6#H)6{}SN~"},
        {"username":"cclipstonc","first_name":"Cleveland","last_name":"Clipston","email":"cclipstonc@uiuc.edu","password":"pG7{f=`Jli"},
        {"username":"amccorkelld","first_name":"Anett","last_name":"McCorkell","email":"amccorkelld@bloglovin.com","password":"dY0_FuWKPU0\"+Qs+"},
        {"username":"linglesente","first_name":"Lyndsay","last_name":"Inglesent","email":"linglesente@hubpages.com","password":"pL2'5SEvQN"},
        {"username":"ebilsborrowf","first_name":"Edith","last_name":"Bilsborrow","email":"ebilsborrowf@surveymonkey.com","password":"cA1$HlU+<w5J"},
        {"username":"rgladecheg","first_name":"Rubi","last_name":"Gladeche","email":"rgladecheg@weebly.com","password":"yG6!#.`8R!NP.Q79"},
        {"username":"vhankeyh","first_name":"Val","last_name":"Hankey","email":"vhankeyh@mashable.com","password":"uM3/jM.9"},
        {"username":"lcockrilli","first_name":"Lizette","last_name":"Cockrill","email":"lcockrilli@nih.gov","password":"zU4!Q+)~d<S"},
        {"username":"csapwellj","first_name":"Clemente","last_name":"Sapwell","email":"csapwellj@gmpg.org","password":"wW2//wo\\.B"},
        {"username":"mbroinlichk","first_name":"Mina","last_name":"Broinlich","email":"mbroinlichk@examiner.com","password":"xR9?<lZ!2CK"},
        {"username":"loflahertyl","first_name":"Lenna","last_name":"O' Flaherty","email":"loflahertyl@joomla.org","password":"bU6=GAZ60ctYFu"},
        {"username":"akulism","first_name":"Adrien","last_name":"Kulis","email":"akulism@webmd.com","password":"lM7&IK1B)0=QA"},
        {"username":"mdearelln","first_name":"Merle","last_name":"Dearell","email":"mdearelln@cmu.edu","password":"zH3(x%q}hFt"},
        {"username":"dknightleyo","first_name":"Dorthea","last_name":"Knightley","email":"dknightleyo@163.com","password":"jH2,D4hI"},
        {"username":"clinzeyp","first_name":"Carolin","last_name":"Linzey","email":"clinzeyp@macromedia.com","password":"sY8\\=giO"},
        {"username":"krichfieldq","first_name":"Karin","last_name":"Richfield","email":"krichfieldq@bigcartel.com","password":"zN2/urfr"},
        {"username":"dclendinningr","first_name":"Delainey","last_name":"Clendinning","email":"dclendinningr@opensource.org","password":"fR0$!2?<"},
        {"username":"gjakubiaks","first_name":"Gertrude","last_name":"Jakubiak","email":"gjakubiaks@so-net.ne.jp","password":"dY3#u}!t/j~5\""},
        {"username":"cdrakefordt","first_name":"Cammy","last_name":"Drakeford","email":"cdrakefordt@newyorker.com","password":"jV6*9sedeS2"},
        {"username":"cshafeu","first_name":"Codie","last_name":"Shafe","email":"cshafeu@joomla.org","password":"sM7'}5UC"},
        {"username":"jorreyv","first_name":"Jamaal","last_name":"Orrey","email":"jorreyv@nymag.com","password":"oG9'|Q\\pInn"},
        {"username":"mmcavinw","first_name":"Mercedes","last_name":"McAvin","email":"mmcavinw@geocities.jp","password":"pZ8=if#},"},
        {"username":"thanhardtx","first_name":"Tad","last_name":"Hanhardt","email":"thanhardtx@goo.ne.jp","password":"nJ5?Nk$#"},
        {"username":"pcockneyy","first_name":"Piggy","last_name":"Cockney","email":"pcockneyy@reddit.com","password":"hS8?_)b)?NA+"},
        {"username":"pnaisbetz","first_name":"Philomena","last_name":"Naisbet","email":"pnaisbetz@imdb.com","password":"wE6*.>UbqSdm'>}m"},
        {"username":"lgress10","first_name":"Lani","last_name":"Gress","email":"lgress10@google.pl","password":"kE9&F83Zx|"},
        {"username":"bvolleth11","first_name":"Brittney","last_name":"Volleth","email":"bvolleth11@jigsy.com","password":"sR4$}ql+"},
        {"username":"eventon12","first_name":"Easter","last_name":"Venton","email":"eventon12@issuu.com","password":"mT3_)A797"},
        {"username":"smeegan13","first_name":"Sid","last_name":"Meegan","email":"smeegan13@creativecommons.org","password":"yL1!_g.5Av,J7"},
        {"username":"cloftus14","first_name":"Carissa","last_name":"Loftus","email":"cloftus14@google.es","password":"cH1`gDAFru5"},
        {"username":"grumens15","first_name":"George","last_name":"Rumens","email":"grumens15@youku.com","password":"rB5&RMIzUc.w5"},
        {"username":"jbovis16","first_name":"Jessi","last_name":"Bovis","email":"jbovis16@addtoany.com","password":"lD3\\tck4jSi"},
        {"username":"akuhnhardt17","first_name":"Alexia","last_name":"Kuhnhardt","email":"akuhnhardt17@umn.edu","password":"jC2$H'$P/CB{Ys"},
        {"username":"gculvey18","first_name":"Gregoire","last_name":"Culvey","email":"gculvey18@altervista.org","password":"pQ2|2l\\o"},
        {"username":"cwagerfield19","first_name":"Clemente","last_name":"Wagerfield","email":"cwagerfield19@skype.com","password":"jR4&AloM<{>zg"},
        {"username":"hnevinson1a","first_name":"Humfrid","last_name":"Nevinson","email":"hnevinson1a@vistaprint.com","password":"lP1`|jOQ"},
        {"username":"vsmalley1b","first_name":"Vicky","last_name":"Smalley","email":"vsmalley1b@nymag.com","password":"jF9/9Q9O\\MZ}"},
        {"username":"odunklee1c","first_name":"Olia","last_name":"Dunklee","email":"odunklee1c@instagram.com","password":"wE1!J)!0k/%"},
        {"username":"ahaughin1d","first_name":"Amalia","last_name":"Haughin","email":"ahaughin1d@1688.com","password":"nK1(.Ev,Hcd/Re(m"},
        {"username":"hboydle1e","first_name":"Hayyim","last_name":"Boydle","email":"hboydle1e@globo.com","password":"kR4,0|,`BhtK"},
        {"username":"mpottiphar1f","first_name":"Maryjane","last_name":"Pottiphar","email":"mpottiphar1f@uiuc.edu","password":"jL3*25uD,?YG"},
        {"username":"vcalles1g","first_name":"Vincents","last_name":"Calles","email":"vcalles1g@gnu.org","password":"dV8%0+pyRK7Ro&LW"},
        {"username":"kpeirpoint1h","first_name":"Kariotta","last_name":"Peirpoint","email":"kpeirpoint1h@usnews.com","password":"iC0{ZF1FzBke$>dC"},
        {"username":"greap1i","first_name":"Glenda","last_name":"Reap","email":"greap1i@wordpress.org","password":"eW0%O*m#fY7"},
        {"username":"gsallowaye1j","first_name":"Geoffry","last_name":"Sallowaye","email":"gsallowaye1j@eventbrite.com","password":"hW2)<<@WQ?@pZR"},
        {"username":"epopple1k","first_name":"Elston","last_name":"Popple","email":"epopple1k@mapy.cz","password":"tW2#Nvq,"},
        {"username":"cdebruijne1l","first_name":"Caz","last_name":"De Bruijne","email":"cdebruijne1l@ameblo.jp","password":"qV5#?1)\\C("},
        {"username":"handersch1m","first_name":"Hazel","last_name":"Andersch","email":"handersch1m@kickstarter.com","password":"pP8_{D//S"},
        {"username":"btwinbrow1n","first_name":"Boyce","last_name":"Twinbrow","email":"btwinbrow1n@telegraph.co.uk","password":"aC1~v=pL>`_"},
        {"username":"rmoquin1o","first_name":"Roanne","last_name":"Moquin","email":"rmoquin1o@360.cn","password":"zU0@cG{(!\"59E+2,"},
        {"username":"dmcilhone1p","first_name":"Danice","last_name":"McIlhone","email":"dmcilhone1p@pinterest.com","password":"eU2@h#<3k)i5Oe"},
        {"username":"pibbett1q","first_name":"Poul","last_name":"Ibbett","email":"pibbett1q@time.com","password":"yJ5$KZo'EByFD"},
        {"username":"mtack1r","first_name":"Mandy","last_name":"Tack","email":"mtack1r@google.pl","password":"uE1$Td~I*C"},
        {"username":"pmcgiff1s","first_name":"Perceval","last_name":"McGiff","email":"pmcgiff1s@eepurl.com","password":"nK9_dU3s!Ob{&X0"},
        {"username":"ccandlin1t","first_name":"Calypso","last_name":"Candlin","email":"ccandlin1t@engadget.com","password":"dD7?4xFgiI<gS#<"},
        {"username":"nredfearn1u","first_name":"Norman","last_name":"Redfearn","email":"nredfearn1u@theguardian.com","password":"vP5\"rF*e"},
        {"username":"wcobbled1v","first_name":"Wes","last_name":"Cobbled","email":"wcobbled1v@usa.gov","password":"nD5?GzC%t"},
        {"username":"nlandrean1w","first_name":"Neda","last_name":"Landrean","email":"nlandrean1w@sina.com.cn","password":"qN0\"_lbbE%AVb"},
        {"username":"slown1x","first_name":"Selia","last_name":"Lown","email":"slown1x@wikia.com","password":"uC1!m7z{"}
    ]

    all_users = []
    for user_data in users_data:
        profile_pic = random.choice(image_urls)
        user = User(
            username=user_data["username"],
            email=user_data["email"],
            password=user_data["password"],
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            profile_pic=profile_pic
        )
        all_users.append(user)
        db.session.add(user)

    db.session.commit()
    return all_users


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
