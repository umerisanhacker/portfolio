/* UMER PORTFOLIO — DATA LAYER */
(function(w){
  w.UmerPortfolio=w.UmerPortfolio||{};
  w.UmerPortfolio.Data={
    CONFIG:{email:'umerpv2007@gmail.com',phoneDisplay:'+91 96333 16131',phoneTel:'+919633316131',whatsapp:'919633316131',waMessage:"Hey Umer! I just saw your portfolio — let's build something."},
    LINKS:{nova:'#',studyflow:'#',luxzy:'https://luxzy-file-converter.vercel.app/',omnipress:'https://omnipress-app.vercel.app/',filecompressor:'https://file-compressor-rho.vercel.app/',uapv:'https://uapv-yt-downloader.vercel.app/',quizcraft:'https://quizcraft-pro.vercel.app/',classroom:'https://classroom-chat-flax.vercel.app/',noufa:'https://noufa-s-kitchen.vercel.app/',webcut:'https://webcut-pro-ruddy.vercel.app/',yip:'https://yip-9-0.vercel.app/',kmct:'https://kmct-ietm-28-in-1-register-production.up.railway.app/',clientbase:'https://portfolio-2-0-eta-lac.vercel.app/',sunora:'#commerce'},
    CASES:{
      nova:{p:'A newly built AI product experience presented as a local portfolio build while its public deployment is still pending.',s:'Immersive AI-oriented interface with a product-first visual system and interaction layer.',st:'Frontend · Motion · AI product UX',m:['NEW BUILD','LOCAL MEDIA PREVIEW','NOT HOSTED YET'],live:false},
      studyflow:{p:'A newly built AI study platform focused on turning learning into a clearer, more structured workflow.',s:'AI-assisted study experience with a calm information architecture and focused learning surfaces.',st:'Frontend · AI UX · EdTech',m:['NEW BUILD','LOCAL MEDIA PREVIEW','NOT HOSTED YET'],live:false},
      luxzy:{p:'Creators juggling 30+ formats needed one browser tool.',s:'Universal converter studio with AI BG-remove, 4K upscale and a canvas editor.',st:'Vanilla JS · Canvas · Web APIs',m:['30+ formats','AI 4K upscale','Tiered plans']},
      omnipress:{p:'Heavy files break emails and slow sites.',s:'MIME-routed compression with exact target-KB control.',st:'Vanilla JS · FFmpeg · MIME routing',m:['100MB cap','Target-KB','Zero watermark']},
      filecompressor:{p:'People want one simple compressor that just works.',s:'A dedicated, free, no-watermark compression engine.',st:'Vanilla JS · Binary pipelines',m:['Free forever','Video+docs+zip']},
      uapv:{p:'YouTube locks 4K/8K behind DASH + bot checks.',s:'6-thread FFmpeg extraction with client spoofing.',st:'FFmpeg · 6 threads · AV1/VP9/H.264',m:['4K/8K','MP3 320kbps','Auto-merge']},
      quizcraft:{p:'Teachers needed fun quizzes without sign-up walls.',s:'Picture quizzes, puzzle zone, teacher hub with codes.',st:'Vanilla JS · LocalStorage',m:['∞ questions','Puzzle zone','Teacher hub']},
      classroom:{p:'Classes needed realtime chat without apps.',s:'Network-code classroom chat, realtime.',st:'Vanilla JS · WebSockets-style',m:['Realtime','No installs']},
      noufa:{p:'Home spices needed an honest online storefront.',s:'WhatsApp-order storefront with 40-dish recipe vault.',st:'Vanilla JS · WhatsApp API',m:['40 recipes','WA orders']},
      clientbase:{p:'A client needed a personal brand site fast.',s:'Hero-film brand site, shipped in days.',st:'Vanilla JS · Motion',m:['Shipped fast','Brand site']},
      kmct:{p:'An institution needed interactive technical manuals.',s:'28-in-1 register with live dashboards.',st:'Vanilla JS · Dashboards',m:['Mega project','Live data']},
      yip:{p:'A product needed an immersive showcase.',s:'3D-configurator scroll experience.',st:'Vanilla JS · 3D',m:['Immersive','Configurator']},
      sunora:{p:'A skincare brand needed a revenue engine.',s:'Shopify DTC engine, top-seller of my stores.',st:'Shopify · Liquid · CRO',m:['₹14.9L','1,285 orders','2.35% conv']},
      webcut:{p:'Creators needed desktop-grade editing, zero installs.',s:'100% local browser NLE: split, grade, caption, export.',st:'Vanilla JS · Canvas · MediaRecorder',m:['0 uploads','4.9★ press','12K+ creators']}
    },
    HOLO_PROJECTS:[
      ['webcut','WEBCUT PRO','BROWSER NLE','assets/projects/webcut.jpg','assets/videos/webcut.mp4','live','cyan'],
      ['luxzy','LUXZY STUDIO','AI CONVERTER','assets/projects/luxzy.jpg','assets/videos/luxzy.mp4','live','violet'],
      ['omnipress','OMNIPRESS','FILE ENGINE','assets/projects/omnipress.jpg',null,'live','magenta'],
      ['filecompressor','FILE COMPRESSOR','COMPRESSION','assets/projects/omnipress.jpg',null,'live','gold'],
      ['uapv','UAPV DOWNLOADER','YT ENGINE','assets/projects/uapv.jpg','assets/videos/uapv.mp4','live','cyan'],
      ['quizcraft','QUIZCRAFT PRO','EDTECH','assets/projects/quizcraft.jpg','assets/videos/quizcraft.mp4','live','violet'],
      ['classroom','CLASSROOMCHAT','REALTIME EDTECH','assets/projects/ClassroomChat.jpg','assets/videos/ClassroomChat.mp4','live','magenta'],
      ['noufa',"NOUFA'S KITCHEN",'SPICE COMMERCE','assets/projects/noufa.jpg','assets/videos/noufa.mp4','live','gold'],
      ['clientbase','CLIENT PORTFOLIO','BRAND SITE','assets/projects/Client_base_portfolio.jpg','assets/videos/Client_base_portfolio.mp4','live','cyan'],
      ['kmct','KMCT IETM','MEGA PROJECT','assets/projects/KMCT-IETM.jpg','assets/videos/KMCT-IETM.mp4','live','violet'],
      ['yip','YIP-9.0','PRODUCT STUDIO','assets/projects/Yip-9.0-Project.jpg','assets/videos/Yip-9.0.mp4','live','magenta'],
      ['sunora','SUNORA AURA','₹14.9L STORE','assets/photos/shopify-dashboard.jpg',null,'internal','gold'],
      ['nova','NOVA-AI','AI PRODUCT','assets/projects/Nova-AI.jpg','assets/videos/Nova-AI.mp4','local','cyan'],
      ['studyflow','STUDYFLOW-AI','EDTECH AI','assets/projects/StudyFlow-AI.jpg','assets/videos/StudyFlow-AI.mp4','local','violet']
    ],
    HOLO_LIVE:{webcut:'https://webcut-pro-ruddy.vercel.app/',luxzy:'https://luxzy-file-converter.vercel.app/',omnipress:'https://omnipress-app.vercel.app/',filecompressor:'https://file-compressor-rho.vercel.app/',uapv:'https://uapv-yt-downloader.vercel.app/',quizcraft:'https://quizcraft-pro.vercel.app/',classroom:'https://classroom-chat-flax.vercel.app/',noufa:'https://noufa-s-kitchen.vercel.app/',clientbase:'https://portfolio-2-0-eta-lac.vercel.app/',kmct:'https://kmct-ietm-28-in-1-register-production.up.railway.app/',yip:'https://yip-9-0.vercel.app/'}
  };
})(window);
