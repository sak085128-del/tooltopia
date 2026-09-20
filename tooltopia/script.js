(function () {
    'use strict';

    var CATEGORIES = ['Writing', 'Image', 'Video', 'Audio', 'Documents', 'Coding', 'Marketing', 'Education', 'Productivity', 'Business'];

    var FAV_KEY = 'tooltopia:favorites';

    var TOOLS = [
{
            id: 'chatgpt', name: 'ChatGPT', slug: 'chatgpt', icon: '💬', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=chatgpt.com',
            desc: 'Conversational AI assistant for writing, research, ideas, and everyday tasks.',
            features: ['Human-like conversation', 'Long-form writing', 'Code and analysis', 'Voice mode'],
            website: 'chatgpt.com', url: 'https://chatgpt.com', price: 'Freemium',
            rating: 4.8, ratings: 32000, isNew: false, added: '2024-11-30', pop: 99, tags: ['chatgpt', 'gpt', 'assistant', 'openai']
        },
        {
            id: 'claude', name: 'Claude', slug: 'claude', icon: '🧠', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=claude.ai',
            desc: 'Anthropic AI assistant known for thoughtful writing, coding, and analysis.',
            features: ['Long context window', 'Artifacts canvas', 'Deep reasoning', 'Projects'],
            website: 'claude.ai', url: 'https://claude.ai', price: 'Freemium',
            rating: 4.8, ratings: 28000, isNew: false, added: '2024-12-02', pop: 97, tags: ['claude', 'anthropic', 'assistant', 'writing']
        },
        {
            id: 'perplexity', name: 'Perplexity', slug: 'perplexity', icon: '🔎', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=perplexity.ai',
            desc: 'AI answer engine that searches the web and cites its sources.',
            features: ['Real-time web search', 'Source citations', 'Follow-up questions', 'Research mode'],
            website: 'perplexity.ai', url: 'https://www.perplexity.ai', price: 'Freemium',
            rating: 4.7, ratings: 15000, isNew: false, added: '2024-12-20', pop: 89, tags: ['perplexity', 'search', 'answers', 'research']
        },
        {
            id: 'jasper', name: 'Jasper', slug: 'jasper', icon: '✍️', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=jasper.ai',
            desc: 'AI marketing copywriter for blogs, ads, and brand content.',
            features: ['Brand voice', 'Campaign tools', 'SEO mode', 'Templates'],
            website: 'jasper.ai', url: 'https://www.jasper.ai', price: 'Paid',
            rating: 4.3, ratings: 6800, isNew: false, added: '2025-02-10', pop: 64, tags: ['jasper', 'marketing', 'copywriting', 'content']
        },
        {
            id: 'quillbot', name: 'QuillBot', slug: 'quillbot', icon: '🔧', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=quillbot.com',
            desc: 'Paraphrasing, grammar checking, and summarizing tool for students and writers.',
            features: ['Paraphraser', 'Grammar checker', 'Summarizer', 'Citation generator'],
            website: 'quillbot.com', url: 'https://quillbot.com', price: 'Freemium',
            rating: 4.3, ratings: 7800, isNew: false, added: '2025-03-05', pop: 63, tags: ['quillbot', 'paraphrase', 'grammar', 'student']
        },
        {
            id: 'copy-ai', name: 'Copy.ai', slug: 'copy-ai', icon: '📋', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=copy.ai',
            desc: 'AI writing platform for go-to-market teams and content creators.',
            features: ['Content workflows', 'Brand voice', '150+ templates', 'Workflow automation'],
            website: 'copy.ai', url: 'https://www.copy.ai', price: 'Freemium',
            rating: 4.2, ratings: 5400, isNew: false, added: '2025-03-22', pop: 58, tags: ['copy.ai', 'content', 'go to market', 'templates']
        },
        {
            id: 'pi', name: 'Pi', slug: 'pi', icon: '🌱', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=pi.ai',
            desc: 'Inflection AI personal assistant built for supportive conversation.',
            features: ['Personal chat', 'Voice interaction', 'Memory', 'Supportive tone'],
            website: 'pi.ai', url: 'https://pi.ai', price: 'Free',
            rating: 4.4, ratings: 3200, isNew: false, added: '2025-04-14', pop: 55, tags: ['pi', 'inflection', 'assistant', 'chat']
        },
        {
            id: 'midjourney', name: 'Midjourney', slug: 'midjourney', icon: '🎨', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=midjourney.com',
            desc: 'Leading AI image generator known for stunning artistic quality.',
            features: ['Text to image', 'Style remixing', 'Upscaling', 'Discord integration'],
            website: 'midjourney.com', url: 'https://www.midjourney.com', price: 'Paid',
            rating: 4.8, ratings: 19000, isNew: false, added: '2024-11-30', pop: 98, tags: ['midjourney', 'image', 'art', 'generator']
        },
        {
            id: 'dalle', name: 'DALL-E 3', slug: 'dalle', icon: '🖼️', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=openai.com',
            desc: 'OpenAI image generator built into ChatGPT with precise prompt understanding.',
            features: ['Accurate prompt following', 'High-resolution output', 'Inpainting', 'ChatGPT integration'],
            website: 'openai.com', url: 'https://openai.com/dall-e-3', price: 'Freemium',
            rating: 4.6, ratings: 13000, isNew: false, added: '2024-12-05', pop: 88, tags: ['dall-e', 'openai', 'image', 'text to image']
        },
        {
            id: 'leonardo', name: 'Leonardo AI', slug: 'leonardo', icon: '🐉', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=leonardo.ai',
            desc: 'AI art and design studio with fine-tuned models and canvas tools.',
            features: ['Model library', 'AI canvas', 'Image generation', 'Prompt guidance'],
            website: 'leonardo.ai', url: 'https://leonardo.ai', price: 'Freemium',
            rating: 4.5, ratings: 8000, isNew: false, added: '2025-01-10', pop: 76, tags: ['leonardo', 'art', 'design', 'text to image']
        },
        {
            id: 'stable-diffusion', name: 'Stable Diffusion', slug: 'stable-diffusion', icon: '🎆', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=stability.ai',
            desc: 'Open-source AI image model run locally or through Stability services.',
            features: ['Open weights', 'Local generation', 'Inpainting', 'Community models'],
            website: 'stability.ai', url: 'https://stability.ai', price: 'Freemium',
            rating: 4.5, ratings: 7000, isNew: false, added: '2025-01-18', pop: 74, tags: ['stable diffusion', 'open source', 'image', 'local']
        },
        {
            id: 'canva', name: 'Canva Magic Studio', slug: 'canva', icon: '🎛️', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=canva.com',
            desc: 'AI design suite for presentations, social posts, and brand graphics.',
            features: ['Magic Design', 'Magic Write', 'Background remover', 'One-click brand'],
            website: 'canva.com', url: 'https://www.canva.com', price: 'Freemium',
            rating: 4.7, ratings: 16000, isNew: false, added: '2025-01-25', pop: 73, tags: ['canva', 'design', 'presentation', 'social']
        },
        {
            id: 'firefly', name: 'Adobe Firefly', slug: 'firefly', icon: '🦋', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=firefly.adobe.com',
            desc: 'Adobe generative AI for safe, commercially-usable images and effects.',
            features: ['Text to image', 'Generative fill', 'Photoshop integration', 'Commercial safety'],
            website: 'firefly.adobe.com', url: 'https://firefly.adobe.com', price: 'Freemium',
            rating: 4.5, ratings: 6000, isNew: false, added: '2025-02-02', pop: 72, tags: ['adobe', 'firefly', 'image', 'generative fill']
        },
        {
            id: 'ideogram', name: 'Ideogram', slug: 'ideogram', icon: '✏️', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=ideogram.ai',
            desc: 'AI image generator famous for accurate text rendering in images.',
            features: ['Text in images', 'Style presets', 'Magic prompt', 'Community feed'],
            website: 'ideogram.ai', url: 'https://ideogram.ai', price: 'Freemium',
            rating: 4.4, ratings: 4500, isNew: false, added: '2025-02-14', pop: 68, tags: ['ideogram', 'text to image', 'typography', 'art']
        },
        {
            id: 'krea', name: 'Krea AI', slug: 'krea', icon: '✨', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=krea.ai',
            desc: 'Realtime AI image generation and creative upscaling studio.',
            features: ['Realtime generation', 'Upscale', 'Enhancer', 'Style transfer'],
            website: 'krea.ai', url: 'https://www.krea.ai', price: 'Freemium',
            rating: 4.4, ratings: 3500, isNew: false, added: '2025-03-10', pop: 61, tags: ['krea', 'realtime', 'upscale', 'image']
        },
        {
            id: 'remini', name: 'Remini', slug: 'remini', icon: '📷', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=remini.ai',
            desc: 'AI photo enhancer that restores and sharpens old or blurry photos.',
            features: ['Photo restoration', 'Face enhancement', 'Video enhancement', 'Mobile app'],
            website: 'remini.ai', url: 'https://remini.ai', price: 'Freemium',
            rating: 4.3, ratings: 4900, isNew: false, added: '2025-04-06', pop: 54, tags: ['remini', 'enhance', 'restore', 'photos']
        },
        {
            id: 'fotor', name: 'Fotor', slug: 'fotor', icon: '🗻', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=fotor.com',
            desc: 'Online photo editor with AI generation, backgrounds, and design tools.',
            features: ['AI image generator', 'Background remover', 'Photo editor', 'Collage maker'],
            website: 'fotor.com', url: 'https://www.fotor.com', price: 'Freemium',
            rating: 4.2, ratings: 3200, isNew: false, added: '2025-05-03', pop: 52, tags: ['fotor', 'photo editor', 'text to image', 'design']
        },
        {
            id: 'runway', name: 'Runway', slug: 'runway', icon: '🎬', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=runwayml.com',
            desc: 'AI video generation and editing suite used by filmmakers.',
            features: ['Text to video', 'Gen-3 Alpha', 'Inpainting', 'Studio suite'],
            website: 'runwayml.com', url: 'https://runwayml.com', price: 'Freemium',
            rating: 4.7, ratings: 9800, isNew: false, added: '2024-12-08', pop: 91, tags: ['runway', 'text to video', 'filmmaking', 'gen-3']
        },
        {
            id: 'pika', name: 'Pika', slug: 'pika', icon: '🌀', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=pika.art',
            desc: 'AI video generator with playful effects and prompt-based editing.',
            features: ['Text to video', 'Video effects', 'Pikaffects', 'Image to video'],
            website: 'pika.art', url: 'https://pika.art', price: 'Freemium',
            rating: 4.4, ratings: 5200, isNew: false, added: '2025-01-08', pop: 75, tags: ['pika', 'text to video', 'effects', 'video']
        },
        {
            id: 'heygen', name: 'HeyGen', slug: 'heygen', icon: '🎙️', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=heygen.com',
            desc: 'AI avatar video platform for talking-head content and translation.',
            features: ['Avatar videos', 'Voice translation', 'AI studio', 'Templates'],
            website: 'heygen.com', url: 'https://www.heygen.com', price: 'Freemium',
            rating: 4.5, ratings: 6000, isNew: false, added: '2025-01-20', pop: 71, tags: ['heygen', 'avatars', 'video', 'translation']
        },
        {
            id: 'capcut', name: 'CapCut', slug: 'capcut', icon: '🎞️', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=capcut.com',
            desc: 'Free video editor with AI captions, effects, and templates.',
            features: ['Auto captions', 'AI effects', 'Templates', 'Desktop and mobile'],
            website: 'capcut.com', url: 'https://www.capcut.com', price: 'Freemium',
            rating: 4.4, ratings: 12000, isNew: false, added: '2025-01-27', pop: 69, tags: ['capcut', 'video editor', 'captions', 'effects']
        },
        {
            id: 'descript', name: 'Descript', slug: 'descript', icon: '🎤', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=descript.com',
            desc: 'Edit podcasts and videos by editing text with studio-grade AI.',
            features: ['Edit by text', 'Studio sound', 'Green screen', 'Screen recording'],
            website: 'descript.com', url: 'https://www.descript.com', price: 'Freemium',
            rating: 4.5, ratings: 5200, isNew: false, added: '2025-02-18', pop: 67, tags: ['descript', 'podcast', 'transcription', 'video editor']
        },
        {
            id: 'synthesia', name: 'Synthesia', slug: 'synthesia', icon: '🧑‍🏫', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=synthesia.io',
            desc: 'Create professional AI avatar videos for training and marketing.',
            features: ['140+ avatars', '120+ languages', 'Template library', 'Team workflows'],
            website: 'synthesia.io', url: 'https://www.synthesia.io', price: 'Paid',
            rating: 4.4, ratings: 4100, isNew: false, added: '2025-03-14', pop: 66, tags: ['synthesia', 'avatars', 'training', 'video']
        },
        {
            id: 'luma', name: 'Luma Dream Machine', slug: 'luma', icon: '🌠', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=lumalabs.ai',
            desc: 'AI video model that creates smooth, realistic motion from text or images.',
            features: ['Text to video', 'Image to video', 'Keyframe control', 'High speed'],
            website: 'lumalabs.ai', url: 'https://lumalabs.ai/dream-machine', price: 'Freemium',
            rating: 4.5, ratings: 3800, isNew: false, added: '2025-04-08', pop: 65, tags: ['luma', 'dream machine', 'text to video', 'generator']
        },
        {
            id: 'd-id', name: 'D-ID', slug: 'd-id', icon: '🗿', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=d-id.com',
            desc: 'Generate interactive AI presenters and talking avatars from a photo.',
            features: ['Talking photos', 'AI presenters', 'Live chat API', 'Translations'],
            website: 'd-id.com', url: 'https://www.d-id.com', price: 'Paid',
            rating: 4.2, ratings: 2200, isNew: false, added: '2025-05-20', pop: 50, tags: ['d-id', 'avatars', 'talking photos', 'video']
        },
        {
            id: 'elevenlabs', name: 'ElevenLabs', slug: 'elevenlabs', icon: '🎧', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=elevenlabs.io',
            desc: 'The most realistic AI text to speech and voice cloning platform.',
            features: ['Ultra-realistic TTS', 'Voice cloning', 'Speech to speech', '32+ languages'],
            website: 'elevenlabs.io', url: 'https://elevenlabs.io', price: 'Freemium',
            rating: 4.7, ratings: 12000, isNew: false, added: '2024-12-12', pop: 93, tags: ['elevenlabs', 'tts', 'voice cloning', 'audio']
        },
        {
            id: 'suno', name: 'Suno', slug: 'suno', icon: '🎵', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=suno.com',
            desc: 'Generate complete songs with vocals, lyrics, and instruments from a prompt.',
            features: ['Full song generation', 'Lyrics', 'Voice customization', 'Sections control'],
            website: 'suno.com', url: 'https://suno.com', price: 'Freemium',
            rating: 4.6, ratings: 9500, isNew: false, added: '2024-12-22', pop: 90, tags: ['suno', 'music', 'songs', 'generation']
        },
        {
            id: 'speechify', name: 'Speechify', slug: 'speechify', icon: '📖', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=speechify.com',
            desc: 'AI text to speech reader that turns any text into natural audio.',
            features: ['Natural voices', 'Scan and read', 'OCR support', 'Multi-platform'],
            website: 'speechify.com', url: 'https://speechify.com', price: 'Freemium',
            rating: 4.4, ratings: 5000, isNew: false, added: '2025-02-25', pop: 62, tags: ['speechify', 'tts', 'reading', 'audiobooks']
        },
        {
            id: 'murf', name: 'Murf AI', slug: 'murf', icon: '🗣️', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=murf.ai',
            desc: 'Studio-quality AI voiceovers for videos, ads, and e-learning.',
            features: ['120+ voices', 'Voice cloning', 'Sync to video', 'Collaboration'],
            website: 'murf.ai', url: 'https://murf.ai', price: 'Freemium',
            rating: 4.3, ratings: 3400, isNew: false, added: '2025-04-18', pop: 59, tags: ['murf', 'voiceover', 'tts', 'video']
        },
        {
            id: 'playht', name: 'Play.ht', slug: 'playht', icon: '📢', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=play.ht',
            desc: 'AI voice generator for realistic TTS audio and podcast production.',
            features: ['900+ voices', 'Voice cloning', 'Podcast generator', 'API'],
            website: 'play.ht', url: 'https://play.ht', price: 'Freemium',
            rating: 4.3, ratings: 2800, isNew: false, added: '2025-05-08', pop: 57, tags: ['play.ht', 'tts', 'podcast', 'voices']
        },
        {
            id: 'whisper', name: 'OpenAI Whisper', slug: 'whisper', icon: '👂', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=openai.com',
            desc: 'Open-source speech recognition model with high accuracy transcription.',
            features: ['99 languages', 'Open source', 'Local runtime', 'Translation'],
            website: 'openai.com', url: 'https://openai.com/research/whisper', price: 'Free',
            rating: 4.3, ratings: 3000, isNew: false, added: '2025-06-10', pop: 49, tags: ['whisper', 'speech to text', 'transcription', 'openai']
        },
        {
            id: 'naturalreader', name: 'NaturalReader', slug: 'naturalreader', icon: '🗒️', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=naturalreaders.com',
            desc: 'Text to speech reader for documents, PDFs, and web pages.',
            features: ['AI voices', 'OCR scanning', 'Immersive reading', 'Mobile apps'],
            website: 'naturalreaders.com', url: 'https://www.naturalreaders.com', price: 'Freemium',
            rating: 4.3, ratings: 3800, isNew: false, added: '2025-06-22', pop: 47, tags: ['naturalreader', 'tts', 'reading', 'documents']
        },
        {
            id: 'soundraw', name: 'Soundraw', slug: 'soundraw', icon: '🎹', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=soundraw.io',
            desc: 'Generate and customize royalty-free AI music for your projects.',
            features: ['Music generation', 'Customization controls', 'Royalty-free', 'Unlimited edits'],
            website: 'soundraw.io', url: 'https://soundraw.io', price: 'Freemium',
            rating: 4.2, ratings: 1500, isNew: false, added: '2025-07-01', pop: 45, tags: ['soundraw', 'music', 'royalty free', 'generation']
        },
        {
            id: 'notebooklm', name: 'NotebookLM', slug: 'notebooklm', icon: '📓', category: 'Documents',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=notebooklm.google.com',
            desc: 'Google AI notebook that understands your sources and generates quizzes.',
            features: ['Source grounded', 'Audio overviews', 'Study guides', 'Citation anchors'],
            website: 'notebooklm.google.com', url: 'https://notebooklm.google.com', price: 'Free',
            rating: 4.6, ratings: 7000, isNew: false, added: '2024-12-25', pop: 81, tags: ['notebooklm', 'google', 'notes', 'research']
        },
        {
            id: 'chatpdf', name: 'ChatPDF', slug: 'chatpdf', icon: '📄', category: 'Documents',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=chatpdf.com',
            desc: 'Chat with any PDF and get instant, cited answers from your documents.',
            features: ['PDF chat', 'Citation answers', 'Summaries', 'No sign-up trial'],
            website: 'chatpdf.com', url: 'https://www.chatpdf.com', price: 'Freemium',
            rating: 4.5, ratings: 6000, isNew: false, added: '2025-01-05', pop: 79, tags: ['chatpdf', 'pdf', 'chat', 'documents']
        },
        {
            id: 'gamma', name: 'Gamma', slug: 'gamma', icon: '📊', category: 'Documents',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=gamma.app',
            desc: 'AI for stunning presentations, documents, and websites in seconds.',
            features: ['AI decks', 'One-click templates', 'Polished design', 'Embed and share'],
            website: 'gamma.app', url: 'https://gamma.app', price: 'Freemium',
            rating: 4.6, ratings: 7500, isNew: false, added: '2025-01-15', pop: 77, tags: ['gamma', 'presentations', 'documents', 'design']
        },
        {
            id: 'deepl', name: 'DeepL', slug: 'deepl', icon: '🌐', category: 'Documents',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=deepl.com',
            desc: 'The most accurate neural machine translation service available.',
            features: ['Translate documents', 'DeepL Write', '32+ languages', 'API'],
            website: 'deepl.com', url: 'https://www.deepl.com', price: 'Freemium',
            rating: 4.7, ratings: 9000, isNew: false, added: '2025-02-06', pop: 70, tags: ['deepl', 'translation', 'language', 'documents']
        },
        {
            id: 'kagi', name: 'Kagi', slug: 'kagi', icon: '🥾', category: 'Documents',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=kagi.com',
            desc: 'Privacy-first search engine with AI answers and no ads or tracking.',
            features: ['No tracking', 'AI answers', 'Fast search', 'Universal summarize'],
            website: 'kagi.com', url: 'https://kagi.com', price: 'Paid',
            rating: 4.4, ratings: 2500, isNew: false, added: '2025-08-03', pop: 46, tags: ['kagi', 'search engine', 'privacy', 'ai answers']
        },
        {
            id: 'lightpdf', name: 'LightPDF', slug: 'lightpdf', icon: '💡', category: 'Documents',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=lightpdf.com',
            desc: 'Online PDF toolkit with AI chat, editing, conversion, and OCR.',
            features: ['Chat with PDF', 'AI summarizer', 'Format conversion', 'OCR'],
            website: 'lightpdf.com', url: 'https://lightpdf.com', price: 'Freemium',
            rating: 4.2, ratings: 1800, isNew: false, added: '2025-08-18', pop: 42, tags: ['lightpdf', 'pdf', 'chat', 'converter']
        },
        {
            id: 'github-copilot', name: 'GitHub Copilot', slug: 'github-copilot', icon: '🐙', category: 'Coding',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=github.com',
            desc: 'AI pair programmer with code completion and chat inside your editor.',
            features: ['Code suggestions', 'Copilot Chat', 'Test generation', 'Multi-language'],
            website: 'github.com', url: 'https://github.com/features/copilot', price: 'Paid',
            rating: 4.7, ratings: 14000, isNew: false, added: '2024-11-30', pop: 95, tags: ['github', 'copilot', 'coding', 'completions']
        },
        {
            id: 'cursor', name: 'Cursor', slug: 'cursor', icon: '⌨️', category: 'Coding',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=cursor.com',
            desc: 'AI-first code editor built for pair programming with your codebase.',
            features: ['Composer mode', 'Codebase chat', 'Multi-model', 'Agent capabilities'],
            website: 'cursor.com', url: 'https://cursor.com', price: 'Freemium',
            rating: 4.7, ratings: 9000, isNew: false, added: '2024-12-15', pop: 87, tags: ['cursor', 'editor', 'coding', 'agent']
        },
        {
            id: 'claude-code', name: 'Claude Code', slug: 'claude-code', icon: '🖥️', category: 'Coding',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=claude.com',
            desc: 'Anthropic coding agent that works in your terminal and editor.',
            features: ['Terminal agent', 'Multi-step tasks', 'Codebase context', 'Claude quality'],
            website: 'claude.com', url: 'https://claude.com/claude-code', price: 'Paid',
            rating: 4.7, ratings: 6000, isNew: true, added: '2026-09-10', pop: 84, tags: ['claude', 'coding', 'agent', 'terminal']
        },
        {
            id: 'bolt', name: 'Bolt.new', slug: 'bolt', icon: '⚡', category: 'Coding',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=bolt.new',
            desc: 'Generate, run, edit, and deploy full-stack apps directly in the browser.',
            features: ['Prompt to app', 'In-browser runtime', 'Deploy instantly', 'Full-stack'],
            website: 'bolt.new', url: 'https://bolt.new', price: 'Freemium',
            rating: 4.6, ratings: 7000, isNew: false, added: '2025-02-20', pop: 80, tags: ['bolt', 'no code', 'full stack', 'apps']
        },
        {
            id: 'v0', name: 'v0', slug: 'v0', icon: '🎛️', category: 'Coding',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=v0.dev',
            desc: 'Vercel AI that generates React and Tailwind UI from text prompts.',
            features: ['UI generation', 'React and Tailwind', 'Copy blocks', 'Deploy to Vercel'],
            website: 'v0.dev', url: 'https://v0.dev', price: 'Freemium',
            rating: 4.5, ratings: 5500, isNew: false, added: '2025-03-01', pop: 78, tags: ['v0', 'vercel', 'ui', 'react']
        },
        {
            id: 'windsurf', name: 'Windsurf', slug: 'windsurf', icon: '🏄', category: 'Coding',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=windsurf.com',
            desc: 'Agentic AI code editor with Cascade for flow-state development.',
            features: ['Cascade agent', 'Multi-file edits', 'Codebase awareness', 'Fast completions'],
            website: 'windsurf.com', url: 'https://windsurf.com', price: 'Freemium',
            rating: 4.5, ratings: 5000, isNew: false, added: '2025-04-02', pop: 72, tags: ['windsurf', 'codeium', 'editor', 'agent']
        },
        {
            id: 'replit-ai', name: 'Replit AI', slug: 'replit-ai', icon: '🟣', category: 'Coding',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=replit.com',
            desc: 'Build and deploy software in the browser with an AI agent.',
            features: ['AI agent', 'Autocomplete', 'Debugging', 'One-click deploy'],
            website: 'replit.com', url: 'https://replit.com', price: 'Freemium',
            rating: 4.4, ratings: 6800, isNew: false, added: '2025-04-25', pop: 68, tags: ['replit', 'ide', 'deploy', 'agent']
        },
        {
            id: 'phind', name: 'Phind', slug: 'phind', icon: '🧭', category: 'Coding',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=phind.com',
            desc: 'AI search engine and assistant built for developers.',
            features: ['Developer search', 'Code answers', 'Model selection', 'VSCode extension'],
            website: 'phind.com', url: 'https://www.phind.com', price: 'Freemium',
            rating: 4.4, ratings: 3500, isNew: false, added: '2025-06-15', pop: 60, tags: ['phind', 'search', 'developer', 'coding']
        },
        {
            id: 'amazon-q', name: 'Amazon Q', slug: 'amazon-q', icon: '☁️', category: 'Coding',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=aws.amazon.com',
            desc: 'AWS AI assistant for code, AWS services, and enterprise questions.',
            features: ['Code transformation', 'AWS expertise', 'Security checks', 'IDE integration'],
            website: 'aws.amazon.com', url: 'https://aws.amazon.com/q/', price: 'Freemium',
            rating: 4.3, ratings: 4200, isNew: false, added: '2025-07-12', pop: 56, tags: ['amazon q', 'aws', 'coding', 'enterprise']
        },
        {
            id: 'gemini-code-assist', name: 'Gemini Code Assist', slug: 'gemini-code-assist', icon: '🧿', category: 'Coding',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=google.com',
            desc: 'Google AI code assist with free tier and enterprise-grade support.',
            features: ['Multi-language', 'Free tier', 'Google Cloud integration', 'Code review'],
            website: 'google.com', url: 'https://codeassist.google', price: 'Freemium',
            rating: 4.3, ratings: 2600, isNew: false, added: '2025-09-08', pop: 44, tags: ['gemini', 'google', 'coding', 'assist']
        },
        {
            id: 'hubspot-ai', name: 'HubSpot AI', slug: 'hubspot-ai', icon: '🟠', category: 'Marketing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=hubspot.com',
            desc: 'AI tools for content, SEO, and CRM inside the HubSpot platform.',
            features: ['Content assistant', 'AI insights', 'Email generation', 'Reporting copilot'],
            website: 'hubspot.com', url: 'https://www.hubspot.com', price: 'Freemium',
            rating: 4.4, ratings: 5200, isNew: false, added: '2025-06-03', pop: 62, tags: ['hubspot', 'crm', 'marketing', 'content']
        },
        {
            id: 'surfer', name: 'Surfer', slug: 'surfer', icon: '🌊', category: 'Marketing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=surferseo.com',
            desc: 'AI SEO tool for content optimization and rank tracking.',
            features: ['Content editor', 'Keyword research', 'Audit', 'Rank tracking'],
            website: 'surferseo.com', url: 'https://surferseo.com', price: 'Paid',
            rating: 4.3, ratings: 4100, isNew: false, added: '2025-07-25', pop: 55, tags: ['surfer', 'seo', 'content', 'rank']
        },
        {
            id: 'adcreative', name: 'AdCreative.ai', slug: 'adcreative', icon: '📑', category: 'Marketing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=adcreative.ai',
            desc: 'Generate high-converting ad creatives and copy with AI.',
            features: ['Ad creatives', 'Performance scoring', 'Copy generation', 'Brand kits'],
            website: 'adcreative.ai', url: 'https://www.adcreative.ai', price: 'Freemium',
            rating: 4.3, ratings: 2700, isNew: false, added: '2025-08-10', pop: 53, tags: ['adcreative', 'ads', 'creatives', 'marketing']
        },
        {
            id: 'motion', name: 'Motion', slug: 'motion', icon: '📅', category: 'Productivity',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=usemotion.com',
            desc: 'AI calendar assistant that auto-schedules your projects and tasks.',
            features: ['Auto-scheduling', 'Project manager', 'Calendar defense', 'Meeting notes'],
            website: 'usemotion.com', url: 'https://www.usemotion.com', price: 'Paid',
            rating: 4.5, ratings: 4600, isNew: false, added: '2025-05-12', pop: 70, tags: ['motion', 'calendar', 'productivity', 'scheduling']
        },
        {
            id: 'zapier-ai', name: 'Zapier AI', slug: 'zapier-ai', icon: '⚙️', category: 'Productivity',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=zapier.com',
            desc: 'Automate workflows across 7000+ apps with AI agents.',
            features: ['AI agents', 'Workflow builder', '7000+ apps', 'Natural language'],
            website: 'zapier.com', url: 'https://zapier.com', price: 'Freemium',
            rating: 4.4, ratings: 6500, isNew: false, added: '2025-05-28', pop: 67, tags: ['zapier', 'automation', 'workflows', 'no code']
        },
        {
            id: 'otter', name: 'Otter.ai', slug: 'otter', icon: '🦦', category: 'Productivity',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=otter.ai',
            desc: 'AI meeting assistant that records, transcribes, and summarizes calls.',
            features: ['Live transcription', 'Meeting summaries', 'Action items', 'Zoom integration'],
            website: 'otter.ai', url: 'https://otter.ai', price: 'Freemium',
            rating: 4.4, ratings: 5500, isNew: false, added: '2025-06-08', pop: 61, tags: ['otter', 'meetings', 'transcription', 'notes']
        },
        {
            id: 'superhuman', name: 'Superhuman', slug: 'superhuman', icon: '⚡', category: 'Productivity',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=superhuman.com',
            desc: 'Fastest email client with AI writing and triage capabilities.',
            features: ['Instant search', 'AI drafts', 'Snooze', 'Keyboard-first'],
            website: 'superhuman.com', url: 'https://superhuman.com', price: 'Paid',
            rating: 4.3, ratings: 2400, isNew: false, added: '2025-07-20', pop: 51, tags: ['superhuman', 'email', 'productivity', 'inbox']
        },
        {
            id: 'reclaim', name: 'Reclaim', slug: 'reclaim', icon: '🧩', category: 'Productivity',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=reclaim.ai',
            desc: 'Smart calendar that auto-protects time for habits and deep work.',
            features: ['Habit scheduling', 'Smart meetings', 'Buffer time', 'Google Calendar'],
            website: 'reclaim.ai', url: 'https://reclaim.ai', price: 'Freemium',
            rating: 4.3, ratings: 2200, isNew: false, added: '2025-08-22', pop: 44, tags: ['reclaim', 'calendar', 'habits', 'productivity']
        },
        {
            id: 'wolfram-alpha', name: 'Wolfram Alpha', slug: 'wolfram-alpha', icon: '🔢', category: 'Education',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=wolframalpha.com',
            desc: 'Computation engine for math, science, and knowledge answers.',
            features: ['Step-by-step math', 'Data compute', 'Knowledge engine', 'Plot and graphs'],
            website: 'wolframalpha.com', url: 'https://www.wolframalpha.com', price: 'Freemium',
            rating: 4.6, ratings: 7000, isNew: false, added: '2025-05-06', pop: 66, tags: ['wolfram', 'math', 'science', 'computation']
        },
        {
            id: 'khanmigo', name: 'Khanmigo', slug: 'khanmigo', icon: '🎓', category: 'Education',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=khanmigo.org',
            desc: 'Khan Academy AI tutor that guides students instead of giving answers.',
            features: ['Guided learning', 'Socratic method', 'Teacher tools', 'Safe for kids'],
            website: 'khanmigo.org', url: 'https://www.khanmigo.org', price: 'Paid',
            rating: 4.5, ratings: 3000, isNew: false, added: '2025-09-14', pop: 58, tags: ['khanmigo', 'tutor', 'learning', 'education']
        },
        {
            id: 'duolingo', name: 'Duolingo', slug: 'duolingo', icon: '🦉', category: 'Education',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=duolingo.com',
            desc: 'Gamified language learning with AI-powered personalized lessons.',
            features: ['40+ languages', 'AI companions', 'Adaptive learning', 'Streaks and leagues'],
            website: 'duolingo.com', url: 'https://www.duolingo.com', price: 'Freemium',
            rating: 4.6, ratings: 20000, isNew: false, added: '2026-01-10', pop: 57, tags: ['duolingo', 'languages', 'learning', 'education']
        },
        {
            id: 'gauth', name: 'Gauth', slug: 'gauth', icon: '✏️', category: 'Education',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=gauthmath.com',
            desc: 'AI homework tutor that solves math and STEM problems with steps.',
            features: ['Photo problem solver', 'Step-by-step', 'Tutor support', 'STEM subjects'],
            website: 'gauthmath.com', url: 'https://www.gauthmath.com', price: 'Freemium',
            rating: 4.2, ratings: 3500, isNew: false, added: '2026-02-08', pop: 48, tags: ['gauth', 'homework', 'math', 'tutor']
        },
        {
            id: 'quizizz-ai', name: 'Quizizz AI', slug: 'quizizz-ai', icon: '🎯', category: 'Education',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=quizizz.com',
            desc: 'AI quiz generator for classrooms with instant gamified assessments.',
            features: ['AI question generation', 'Gamified quizzes', 'Instant grading', 'Teacher reports'],
            website: 'quizizz.com', url: 'https://quizizz.com', price: 'Freemium',
            rating: 4.2, ratings: 2000, isNew: false, added: '2026-03-02', pop: 46, tags: ['quizizz', 'quizzes', 'classroom', 'assessment']
        },
        {
            id: 'einstein', name: 'Salesforce Einstein', slug: 'einstein', icon: '🌌', category: 'Business',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=salesforce.com',
            desc: 'CRM AI for predictions, automation, and natural-language insights.',
            features: ['Copilot agents', 'Predictive scoring', 'Automated replies', 'Insights'],
            website: 'salesforce.com', url: 'https://www.salesforce.com/ai', price: 'Paid',
            rating: 4.5, ratings: 3800, isNew: false, added: '2025-10-06', pop: 64, tags: ['salesforce', 'einstein', 'crm', 'business']
        },
        {
            id: 'kaia', name: 'Kaia', slug: 'kaia', icon: '🌐', category: 'Business',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=kaia.ai',
            desc: 'Outreach AI conversational assistant for revenue teams.',
            features: ['Conversation intelligence', 'Live assist', 'Automation', 'CRM sync'],
            website: 'kaia.ai', url: 'https://kaia.ai', price: 'Paid',
            rating: 4.3, ratings: 1500, isNew: false, added: '2026-03-20', pop: 43, tags: ['kaia', 'sales', 'conversation', 'revenue']
        },
        {
            id: 'hebbia', name: 'Hebbia', slug: 'hebbia', icon: '📡', category: 'Business',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=hebbia.ai',
            desc: 'AI research assistant that analyzes complex documents for finance and law.',
            features: ['Document analysis', 'Custom workflows', 'Enterprise security', 'Matrix reasoning'],
            website: 'hebbia.ai', url: 'https://www.hebbia.ai', price: 'Paid',
            rating: 4.4, ratings: 1200, isNew: false, added: '2026-06-15', pop: 41, tags: ['hebbia', 'research', 'finance', 'documents']
        },
        {
            id: 'gemini', name: 'Gemini', slug: 'gemini', icon: '✨', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=gemini.google.com',
            desc: 'Google AI assistant for chat, reasoning, agents, and multimodal tasks.',
            features: ['Deep reasoning', 'Multimodal input', 'Agents', 'Google ecosystem'],
            website: 'gemini.google.com', url: 'https://gemini.google.com', price: 'Freemium',
            rating: 4.6, ratings: 16000, isNew: false, added: '2024-11-30', pop: 96, tags: ['gemini', 'google', 'assistant', 'ai']
        },
        {
            id: 'grok', name: 'Grok', slug: 'grok', icon: '🚀', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=x.ai',
            desc: 'xAI assistant built into X with realtime world knowledge.',
            features: ['Realtime info', 'X integration', 'Image generation', 'Voice mode'],
            website: 'x.ai', url: 'https://x.ai', price: 'Freemium',
            rating: 4.4, ratings: 8000, isNew: false, added: '2025-03-19', pop: 78, tags: ['grok', 'xai', 'assistant', 'x']
        },
        {
            id: 'deepseek', name: 'DeepSeek', slug: 'deepseek', icon: '🐋', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=deepseek.com',
            desc: 'Open-weight AI assistant with advanced reasoning and long context.',
            features: ['Deep reasoning', 'Long context', 'Open weights', 'File upload'],
            website: 'deepseek.com', url: 'https://chat.deepseek.com', price: 'Free',
            rating: 4.5, ratings: 9000, isNew: false, added: '2025-01-28', pop: 82, tags: ['deepseek', 'assistant', 'reasoning', 'coding']
        },
        {
            id: 'poe', name: 'Poe', slug: 'poe', icon: '🫧', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=poe.com',
            desc: 'One app to chat with ChatGPT, Claude, Gemini, and hundreds of bots.',
            features: ['Multi-model chat', 'Custom bots', 'Image tools', 'Creator monetization'],
            website: 'poe.com', url: 'https://poe.com', price: 'Freemium',
            rating: 4.4, ratings: 7000, isNew: false, added: '2025-02-11', pop: 72, tags: ['poe', 'chat', 'models', 'bots']
        },
        {
            id: 'quora-poe', name: 'Quora Poe', slug: 'quora-poe', icon: '🫧', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=poe.com',
            desc: 'Poe by Quora powers multi-model conversations in one interface.',
            features: ['Model switching', 'Prompt bots', 'Mobile apps', 'Subscriptions'],
            website: 'poe.com', url: 'https://poe.com', price: 'Freemium',
            rating: 4.3, ratings: 2500, isNew: false, added: '2025-06-30', pop: 33, tags: ['poe', 'quora', 'chat', 'models']
        },
        {
            id: 'imagen', name: 'Imagen', slug: 'imagen', icon: '🖌️', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=deepmind.google',
            desc: 'Google DeepMind photo-realistic text to image generation.',
            features: ['Photorealism', 'Text rendering', 'Style transfer', 'DeepMind quality'],
            website: 'deepmind.google', url: 'https://deepmind.google/technologies/imagen', price: 'Freemium',
            rating: 4.5, ratings: 3800, isNew: false, added: '2025-04-21', pop: 62, tags: ['imagen', 'google', 'text to image', 'deepmind']
        },
        {
            id: 'recraft', name: 'Recraft', slug: 'recraft', icon: '🎨', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=recraft.ai',
            desc: 'AI image generator for design assets with brand consistency.',
            features: ['Vector art', 'Brand kits', 'Style presets', 'Design assets'],
            website: 'recraft.ai', url: 'https://www.recraft.ai', price: 'Freemium',
            rating: 4.5, ratings: 2800, isNew: true, added: '2026-09-18', pop: 59, tags: ['recraft', 'image', 'design', 'vector']
        },
        {
            id: 'seedream', name: 'Seedream', slug: 'seedream', icon: '🌱', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=byteplus.com',
            desc: 'ByteDance AI image model known for realistic Chinese and global content.',
            features: ['Realistic output', 'Text rendering', 'Fast generation', 'Style control'],
            website: 'byteplus.com', url: 'https://www.byteplus.com/product/doubao', price: 'Freemium',
            rating: 4.4, ratings: 1800, isNew: true, added: '2026-09-15', pop: 57, tags: ['seedream', 'bytedance', 'image', 'generation']
        },
        {
            id: 'nano-banana', name: 'Nano Banana', slug: 'nano-banana', icon: '🍌', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=openai.com',
            desc: 'OpenAI image model with consistent editing and high detail.',
            features: ['Photo-realistic', 'Editing precision', 'Style control', 'API access'],
            website: 'openai.com', url: 'https://openai.com', price: 'Paid',
            rating: 4.5, ratings: 2200, isNew: true, added: '2026-09-19', pop: 64, tags: ['nano banana', 'openai', 'image', 'editing']
        },
        {
            id: 'stability', name: 'Stability AI', slug: 'stability', icon: '🏔️', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=stability.ai',
            desc: 'Home of Stable Diffusion and open AI model ecosystem.',
            features: ['Stable Diffusion', 'Stable Video', 'Open models', 'Developer API'],
            website: 'stability.ai', url: 'https://stability.ai', price: 'Freemium',
            rating: 4.3, ratings: 5000, isNew: false, added: '2025-01-30', pop: 60, tags: ['stability', 'stable diffusion', 'image', 'open']
        },
        {
            id: 'venice', name: 'Venice AI', slug: 'venice', icon: '🌊', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=venice.ai',
            desc: 'Private AI platform with uncensored chat and image generation.',
            features: ['Privacy-first', 'Unfiltered models', 'Image generation', 'Crypto payments'],
            website: 'venice.ai', url: 'https://venice.ai', price: 'Freemium',
            rating: 4.3, ratings: 1500, isNew: false, added: '2025-08-25', pop: 41, tags: ['venice', 'privacy', 'image', 'chat']
        },
        {
            id: 'veo', name: 'Veo', slug: 'veo', icon: '▶️', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=deepmind.google',
            desc: 'Google DeepMind cinematic video generation model.',
            features: ['Cinematic quality', '1080p output', 'Long clips', 'Toolkit integration'],
            website: 'deepmind.google', url: 'https://deepmind.google/technologies/veo', price: 'Freemium',
            rating: 4.5, ratings: 3000, isNew: true, added: '2026-09-16', pop: 66, tags: ['veo', 'google', 'text to video', 'deepmind']
        },
        {
            id: 'pixverse', name: 'PixVerse', slug: 'pixverse', icon: '🎞️', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=pixverse.ai',
            desc: 'Fast AI video generation with realistic motion and effects.',
            features: ['Text to video', 'Motion control', 'Templates', 'Fast rendering'],
            website: 'pixverse.ai', url: 'https://pixverse.ai', price: 'Freemium',
            rating: 4.2, ratings: 2000, isNew: false, added: '2025-07-15', pop: 39, tags: ['pixverse', 'video', 'text to video', 'generation']
        },
        {
            id: 'hailuo', name: 'Hailuo AI', slug: 'hailuo', icon: '🌊', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=hailuoai.video',
            desc: 'MiniMax video model with wild cinematic camera motions.',
            features: ['Camera control', 'Realistic motion', 'Text to video', 'Image to video'],
            website: 'hailuoai.video', url: 'https://hailuoai.video', price: 'Freemium',
            rating: 4.4, ratings: 2800, isNew: false, added: '2025-06-05', pop: 51, tags: ['hailuo', 'minimax', 'video', 'cinematic']
        },
        {
            id: 'minimax', name: 'MiniMax', slug: 'minimax', icon: '🀄', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=minimax.io',
            desc: 'AI lab behind Hailuo video and advanced language models.',
            features: ['Video models', 'LLM API', 'Voice models', 'Global reach'],
            website: 'minimax.io', url: 'https://www.minimax.io', price: 'Freemium',
            rating: 4.3, ratings: 1200, isNew: false, added: '2025-08-12', pop: 36, tags: ['minimax', 'hailuo', 'video', 'llm']
        },
        {
            id: 'wav2lip', name: 'Wav2Lip', slug: 'wav2lip', icon: '👄', category: 'Video',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=github.com',
            desc: 'Lip-sync videos to any speech audio with open-source AI.',
            features: ['Lip sync', 'Open source', 'Real-time', 'Avatar dubbing'],
            website: 'github.com', url: 'https://github.com/Rudrabha/Wav2Lip', price: 'Free',
            rating: 4.1, ratings: 900, isNew: false, added: '2025-10-18', pop: 29, tags: ['wav2lip', 'lipsync', 'video', 'open source']
        },
        {
            id: 'grok-voice', name: 'Grok Voice', slug: 'grok-voice', icon: '🗣️', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=x.ai',
            desc: 'Voice mode for Grok with natural conversation on X.',
            features: ['Natural speech', 'Conversational', 'X integration', 'Express yourself'],
            website: 'x.ai', url: 'https://x.ai', price: 'Freemium',
            rating: 4.2, ratings: 1400, isNew: false, added: '2025-10-05', pop: 34, tags: ['grok', 'voice', 'xai', 'audio']
        },
        {
            id: 'notebooklm-audio', name: 'NotebookLM Audio', slug: 'notebooklm-audio', icon: '🎧', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=notebooklm.google.com',
            desc: 'Turn your documents into lifelike AI-hosted audio overviews.',
            features: ['Audio overviews', 'Lifelike hosts', 'Source grounded', 'Shareable audio'],
            website: 'notebooklm.google.com', url: 'https://notebooklm.google.com', price: 'Free',
            rating: 4.5, ratings: 3200, isNew: false, added: '2025-09-20', pop: 52, tags: ['notebooklm', 'audio', 'podcast', 'google']
        },
        {
            id: 'bark', name: 'Bark', slug: 'bark', icon: '🐕', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=github.com',
            desc: 'Open-source text to speech with background noise and music.',
            features: ['Open source', 'Music and noise', 'Multilingual', 'Local run'],
            website: 'github.com', url: 'https://github.com/suno-ai/bark', price: 'Free',
            rating: 4.0, ratings: 600, isNew: false, added: '2025-11-10', pop: 27, tags: ['bark', 'tts', 'open source', 'audio']
        },
        {
            id: 'elevenreader', name: 'ElevenReader', slug: 'elevenreader', icon: '📱', category: 'Audio',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=elevenlabs.io',
            desc: 'Mobile reader app with the most realistic AI voices telling stories.',
            features: ['AI narrators', 'Listen to PDFs', 'Voice library', 'Mobile app'],
            website: 'elevenlabs.io', url: 'https://elevenlabs.io/reader', price: 'Freemium',
            rating: 4.4, ratings: 1800, isNew: false, added: '2025-12-01', pop: 40, tags: ['elevenlabs', 'reader', 'audiobook', 'mobile']
        },
        {
            id: 'notelo', name: 'Notelo', slug: 'notelo', icon: '📌', category: 'Documents',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=notelo.ai',
            desc: 'AI research chat over your documents with deep source citations.',
            features: ['Document chat', 'Citations', 'Summaries', 'Team sharing'],
            website: 'notelo.ai', url: 'https://notelo.ai', price: 'Freemium',
            rating: 4.3, ratings: 700, isNew: false, added: '2026-01-15', pop: 31, tags: ['notelo', 'research', 'documents', 'chat']
        },
        {
            id: 'gpt', name: 'GPT-4o', slug: 'gpt', icon: '💠', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=openai.com',
            desc: 'OpenAI flagship multimodal model available via API and ChatGPT.',
            features: ['Multimodal', 'Realtime API', 'Function calling', 'High speed'],
            website: 'openai.com', url: 'https://openai.com/index/hello-gpt-4o', price: 'Paid',
            rating: 4.6, ratings: 8500, isNew: false, added: '2024-12-28', pop: 68, tags: ['gpt4', 'openai', 'model', 'api']
        },
        {
            id: 'chatgpt-app', name: 'ChatGPT App', slug: 'chatgpt-app', icon: '📱', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=openai.com',
            desc: 'ChatGPT on the go with voice and image conversation.',
            features: ['Voice chat', 'Image chat', 'Offline mode', 'Advanced voice'],
            website: 'openai.com', url: 'https://openai.com/chatgpt/download', price: 'Freemium',
            rating: 4.5, ratings: 4000, isNew: false, added: '2025-02-25', pop: 56, tags: ['chatgpt', 'mobile', 'app', 'voice']
        },
        {
            id: 'llama', name: 'Llama', slug: 'llama', icon: '🦙', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=meta.ai',
            desc: 'Meta open-source LLM family with strong reasoning and local use.',
            features: ['Open weights', 'Local deployment', 'Strong reasoning', 'Long context'],
            website: 'meta.ai', url: 'https://www.llama.com', price: 'Free',
            rating: 4.5, ratings: 5000, isNew: false, added: '2025-04-04', pop: 58, tags: ['llama', 'meta', 'open source', 'model']
        },
        {
            id: 'qwen', name: 'Qwen', slug: 'qwen', icon: '🐉', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=alibaba.com',
            desc: 'Alibaba open-source AI models for chat, coding, and agents.',
            features: ['1M context', 'Open weights', 'Agent framework', 'Multilingual'],
            website: 'alibaba.com', url: 'https://qwenlm.github.io', price: 'Free',
            rating: 4.4, ratings: 3000, isNew: false, added: '2025-05-30', pop: 45, tags: ['qwen', 'alibaba', 'open source', 'llm']
        },
        {
            id: 'notion', name: 'Notion AI', slug: 'notion', icon: '📘', category: 'Productivity',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=notion.so',
            desc: 'AI workspace that writes, summarizes, and organizes your notes.',
            features: ['AI writing', 'Question answering', 'Connects to Slack', 'Projects and docs'],
            website: 'notion.so', url: 'https://www.notion.so/product/ai', price: 'Freemium',
            rating: 4.5, ratings: 8000, isNew: false, added: '2025-03-15', pop: 75, tags: ['notion', 'workspace', 'notes', 'productivity']
        },
        {
            id: 'linear', name: 'Linear', slug: 'linear', icon: '📐', category: 'Productivity',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=linear.app',
            desc: 'Issue tracking and project management with fast keyboard-first UX.',
            features: ['Issue tracking', 'Roadmaps', 'Cycles', 'AI triage'],
            website: 'linear.app', url: 'https://linear.app', price: 'Freemium',
            rating: 4.7, ratings: 3200, isNew: false, added: '2025-06-20', pop: 55, tags: ['linear', 'project management', 'issues', 'roadmap']
        },
        {
            id: 'slack', name: 'Slack AI', slug: 'slack', icon: '💬', category: 'Productivity',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=slack.com',
            desc: 'AI-powered search, summaries, and writing inside Slack.',
            features: ['Channel summaries', 'AI search', 'Daily digest', 'Writing assistant'],
            website: 'slack.com', url: 'https://slack.com', price: 'Freemium',
            rating: 4.3, ratings: 6000, isNew: false, added: '2025-08-01', pop: 48, tags: ['slack', 'productivity', 'chat', 'ai']
        },
        {
            id: 'trello', name: 'Trello AI', slug: 'trello', icon: '📋', category: 'Productivity',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=trello.com',
            desc: 'Kanban boards with AI helpers for planning and automation.',
            features: ['Kanban boards', 'AI planning', 'Automation', 'Business templates'],
            website: 'trello.com', url: 'https://trello.com', price: 'Freemium',
            rating: 4.2, ratings: 4500, isNew: false, added: '2025-09-01', pop: 38, tags: ['trello', 'kanban', 'boards', 'planning']
        },
        {
            id: 'granola', name: 'Granola', slug: 'granola', icon: '🎹', category: 'Productivity',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=granola.ai',
            desc: 'AI note-taker that turns messy meeting audio into clean notes.',
            features: ['Meeting notes', 'Quick sync', 'Team folders', 'Smart formatting'],
            website: 'granola.ai', url: 'https://granola.ai', price: 'Freemium',
            rating: 4.5, ratings: 1200, isNew: true, added: '2026-09-11', pop: 42, tags: ['granola', 'meetings', 'notes', 'ai']
        },
        {
            id: 'cryptocortex', name: 'CryptoCortex', slug: 'cryptocortex', icon: '📊', category: 'Business',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=cryptocortex.ai',
            desc: 'AI analytics platform for market intelligence and trading signals.',
            features: ['Market insights', 'Prediction models', 'Sentiment analysis', 'Dashboard'],
            website: 'cryptocortex.ai', url: 'https://cryptocortex.ai', price: 'Paid',
            rating: 4.1, ratings: 500, isNew: true, added: '2026-09-20', pop: 30, tags: ['crypto', 'analytics', 'trading', 'business']
        },
        {
            id: 'stripe', name: 'Stripe AI', slug: 'stripe', icon: '💳', category: 'Business',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=stripe.com',
            desc: 'Payment platform with AI-powered fraud detection and revenue insights.',
            features: ['Radar fraud AI', 'Revenue analytics', 'Automatic payouts', 'Global payments'],
            website: 'stripe.com', url: 'https://stripe.com', price: 'Paid',
            rating: 4.5, ratings: 5200, isNew: false, added: '2025-09-10', pop: 46, tags: ['stripe', 'payments', 'finance', 'fraud']
        },
        {
            id: 'docsign', name: 'DocSign AI', slug: 'docsign', icon: '✍️', category: 'Business',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=docsign.com',
            desc: 'AI contract review and e-signature for modern teams.',
            features: ['AI contract review', 'E-signatures', 'Risk flags', 'Team workflows'],
            website: 'docsign.com', url: 'https://docsign.com', price: 'Freemium',
            rating: 4.2, ratings: 600, isNew: false, added: '2026-02-01', pop: 28, tags: ['docsign', 'contracts', 'esign', 'business']
        },
        {
            id: 'khanacademy', name: 'Khan Academy AI', slug: 'khanacademy', icon: '📚', category: 'Education',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=khanacademy.org',
            desc: 'Practice exercises with AI hints and instant feedback for learning.',
            features: ['AI hints', 'Instant feedback', 'Practice exercises', 'Progress tracking'],
            website: 'khanacademy.org', url: 'https://www.khanacademy.org', price: 'Free',
            rating: 4.6, ratings: 4000, isNew: false, added: '2025-03-25', pop: 54, tags: ['khan academy', 'learning', 'education', 'practice']
        },
        {
            id: 'duolingo-max', name: 'Duolingo Max', slug: 'duolingo-max', icon: '🦉', category: 'Education',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=duolingo.com',
            desc: 'Premium Duolingo with GPT-4-powered explain-my-mistake features.',
            features: ['Explain my answer', 'Roleplay', 'Video call AI', 'Advanced courses'],
            website: 'duolingo.com', url: 'https://www.duolingo.com', price: 'Paid',
            rating: 4.5, ratings: 2400, isNew: false, added: '2025-06-10', pop: 43, tags: ['duolingo', 'max', 'language', 'gpt4']
        },
        {
            id: 'mathgpt', name: 'MathGPT', slug: 'mathgpt', icon: '🧮', category: 'Education',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=mathgpt.com',
            desc: 'Instant AI math solver for equations, word problems, and graphing.',
            features: ['Photo solver', 'Step-by-step', 'Graphing', 'Multiple subjects'],
            website: 'mathgpt.com', url: 'https://mathgpt.com', price: 'Freemium',
            rating: 4.2, ratings: 1300, isNew: false, added: '2025-11-25', pop: 37, tags: ['mathgpt', 'math', 'solver', 'homework']
        },
        {
            id: 'characterai', name: 'Character AI', slug: 'characterai', icon: '🎭', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=character.ai',
            desc: 'Chat with AI characters for roleplay, creativity, and fun.',
            features: ['Millions of characters', 'Create characters', 'Voice chats', 'Group chats'],
            website: 'character.ai', url: 'https://character.ai', price: 'Freemium',
            rating: 4.4, ratings: 6000, isNew: false, added: '2025-07-22', pop: 65, tags: ['character ai', 'chat', 'roleplay', 'entertainment']
        },
        {
            id: 'humes', name: 'Humes AI', slug: 'humes', icon: '💭', category: 'Writing',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=humes.ai',
            desc: 'Emotion AI models for emotional intelligence in chat and speech.',
            features: ['Emotion detection', 'Speech models', 'Language analysis', 'API'],
            website: 'humes.ai', url: 'https://www.humes.ai', price: 'Freemium',
            rating: 4.0, ratings: 400, isNew: false, added: '2026-03-30', pop: 25, tags: ['humes', 'emotion', 'sentiment', 'api']
        },
        {
            id: 'clipdrop', name: 'Clipdrop', slug: 'clipdrop', icon: '✂️', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=clipdrop.co',
            desc: 'Fast AI image tools from Stability for editing and generation.',
            features: ['Remove background', 'Upscale', 'Replace objects', 'Cleanup'],
            website: 'clipdrop.co', url: 'https://clipdrop.co', price: 'Freemium',
            rating: 4.2, ratings: 1500, isNew: false, added: '2025-11-01', pop: 32, tags: ['clipdrop', 'stability', 'editing', 'image']
        },
        {
            id: 'photoai', name: 'PhotoAI', slug: 'photoai', icon: '🖼️', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=photoai.com',
            desc: 'Turn selfies into striking AI-generated professional photos.',
            features: ['AI avatars', 'Style packs', 'Fast delivery', 'Privacy secure'],
            website: 'photoai.com', url: 'https://photoai.com', price: 'Paid',
            rating: 4.1, ratings: 800, isNew: false, added: '2025-12-15', pop: 26, tags: ['photoai', 'avatars', 'selfies', 'photos']
        },
        {
            id: 'sketch', name: 'Sketch', slug: 'sketch', icon: '🖊️', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=sketch.com',
            desc: 'Pencil sketch AI that transforms photos into artistic sketches.',
            features: ['Sketch effect', 'Style presets', 'Batch process', 'Export HD'],
            website: 'sketch.com', url: 'https://sketch.com', price: 'Freemium',
            rating: 4.0, ratings: 700, isNew: false, added: '2026-01-20', pop: 24, tags: ['sketch', 'art', 'effect', 'photo']
        },
        {
            id: 'pixar-style', name: 'Pixar Style AI', slug: 'pixar-style', icon: '🧸', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=pixarstyle.com',
            desc: 'Turn photos into Pixar-style 3D cartoon characters.',
            features: ['3D cartoon style', 'Social sharable', 'Fun presets', 'Mobile app'],
            website: 'pixarstyle.com', url: 'https://pixarstyle.com', price: 'Freemium',
            rating: 4.0, ratings: 1100, isNew: false, added: '2026-02-10', pop: 27, tags: ['pixar', 'cartoon', 'style', 'fun']
        },
        {
            id: 'skia', name: 'Skia AI', slug: 'skia', icon: '⛷️', category: 'Image',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=skia.ai',
            desc: 'Anime and cartoon photo effects powered by AI.',
            features: ['Anime style', 'Cartoon effects', 'Photo transforms', 'Fast pipeline'],
            website: 'skia.ai', url: 'https://skia.ai', price: 'Freemium',
            rating: 4.1, ratings: 900, isNew: false, added: '2026-02-28', pop: 28, tags: ['skia', 'anime', 'cartoon', 'effects']
        },
        {
            id: 'maze', name: 'Maze', slug: 'maze', icon: '🧭', category: 'Business',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=maze.co',
            desc: 'User research platform with AI-powered insight generation.',
            features: ['AI insights', 'Prototype testing', 'User interviews', 'Analytics'],
            website: 'maze.co', url: 'https://maze.co', price: 'Freemium',
            rating: 4.5, ratings: 1200, isNew: false, added: '2026-03-18', pop: 33, tags: ['maze', 'research', 'ux', 'insights']
        },
        {
            id: 'intercom', name: 'Intercom Fin', slug: 'intercom', icon: '💬', category: 'Business',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=intercom.com',
            desc: 'AI customer service agent that resolves support questions instantly.',
            features: ['Smart replies', 'KB grounding', 'Human handoff', 'Escalation AI'],
            website: 'intercom.com', url: 'https://www.intercom.com/fin', price: 'Paid',
            rating: 4.5, ratings: 3200, isNew: false, added: '2025-05-18', pop: 53, tags: ['intercom', 'support', 'customer service', 'ai']
        },
        {
            id: 'zendesk', name: 'Zendesk AI', slug: 'zendesk', icon: '🎧', category: 'Business',
            logo: 'https://www.google.com/s2/favicons?sz=128&domain=zendesk.com',
            desc: 'AI agents and automations for customer support at scale.',
            features: ['AI agents', 'Smart triage', 'Automations', 'Insights'],
            website: 'zendesk.com', url: 'https://www.zendesk.com', price: 'Paid',
            rating: 4.4, ratings: 4500, isNew: false, added: '2025-07-05', pop: 44, tags: ['zendesk', 'support', 'helpdesk', 'automation']
        }
    ];

    var icons = {
        star: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path fill="currentColor" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2l-6.2 3.7 1.6-7L2 9.2l7.1-.6z"/></svg>',
        heart: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.5.9-4.5 2.3A5.9 5.9 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/></svg>',
        heartFilled: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.5.9-4.5 2.3A5.9 5.9 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/></svg>',
        arrow: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
        check: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
        ext: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>'
    };

    var header = document.getElementById('header');
    var menuToggle = document.getElementById('menuToggle');
    var mainNav = document.getElementById('mainNav');
    var menuIcon = document.getElementById('menuIcon');
    var closeIcon = document.getElementById('closeIcon');
    var heroForm = document.getElementById('heroSearch');
    var heroSearchInput = document.getElementById('heroSearchInput');
    var directorySearch = document.getElementById('directorySearch');
    var sortSelect = document.getElementById('sortSelect');
    var directoryGrid = document.getElementById('directoryGrid');
    var popularGrid = document.getElementById('popularGrid');
    var newGrid = document.getElementById('newGrid');
    var categoryGrid = document.getElementById('categoryGrid');
    var resultCount = document.getElementById('resultCount');
    var emptyState = document.getElementById('emptyState');
    var clearSearchBtn = document.getElementById('clearSearch');
    var toolModal = document.getElementById('toolModal');
    var aboutModal = document.getElementById('aboutModal');
    var modalBody = document.getElementById('modalBody');
    var modalClose = document.getElementById('modalClose');
    var toastEl = document.getElementById('toast');
    var newsletterForm = document.getElementById('newsletterForm');
    var statCount = document.getElementById('statCount');
    var statCategories = document.getElementById('statCategories');
    var statRatings = document.getElementById('statRatings');
    var themeToggle = document.getElementById('themeToggle');
    var themeIconSun = document.getElementById('themeIconSun');
    var themeIconMoon = document.getElementById('themeIconMoon');
    var headerFavBtn = document.getElementById('headerFavBtn');
    var headerFavCount = document.getElementById('headerFavCount');
    var favGrid = document.getElementById('favGrid');
    var favEmpty = document.getElementById('favEmpty');
    var clearFavBtn = document.getElementById('clearFavBtn');
    var recentGrid = document.getElementById('recentGrid');
    var recentEmpty = document.getElementById('recentEmpty');
    var suggestions = document.getElementById('suggestions');
    var heroSearchBtn = document.getElementById('heroSearchBtn');
    var popularSearches = document.getElementById('popularSearches');
    var loadMoreWrap = document.getElementById('loadMoreWrap');
    var loadMoreBtn = document.getElementById('loadMoreBtn');
    var backToTop = document.getElementById('backToTop');
    var cookieBanner = document.getElementById('cookieBanner');
    var cookieAccept = document.getElementById('cookieAccept');
    var cookieDecline = document.getElementById('cookieDecline');
    var compareTray = document.getElementById('compareTray');
    var compareTrayCount = document.getElementById('compareTrayCount');
    var compareSlots = document.getElementById('compareSlots');
    var compareClearBtn = document.getElementById('compareClearBtn');
    var compareGoBtn = document.getElementById('compareGoBtn');
    var compareBarToggle = document.getElementById('compareBarToggle');
    var compareCountBadge = document.getElementById('compareCountBadge');
    var compareModal = document.getElementById('compareModal');
    var compareModalBody = document.getElementById('compareModalBody');
    var compareModalClose = document.getElementById('compareModalClose');
    var priceChips = document.querySelectorAll('.price-chip');

    var currentFilter = 'All';
    var currentSearch = '';
    var currentPrice = 'All';
    var currentFavOnly = false;
    var lastFocused = null;
    var pageSize = 18;
    var shownCount = pageSize;
    var suggestIndex = -1;
    var compareTrayOpen = false;

    var esc = function (s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    };

    var priceClass = function (price) {
        switch (price) {
            case 'Freemium': return 'freemium';
            case 'Free Trial': return 'trial';
            case 'Paid': return 'paid';
            default: return '';
        }
    };

    var formatCount = function (n) {
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        return String(n);
    };

    var formatDate = function (iso) {
        var d = new Date(iso + 'T00:00:00');
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[d.getMonth()] + ' ' + d.getFullYear();
    };

    var catClass = function (cat) {
        return cat.toLowerCase();
    };

    var logoMarkup = function (t, large) {
        var cls = 'tool-logo ' + catClass(t.category) + (large ? ' tool-logo-lg' : '') + (t.logo ? ' logo-real' : '');
        var wh = large ? 62 : 48;
        return '<span class="' + cls + '" aria-hidden="true">' +
            (t.logo
                ? '<img class="tool-logo-img" src="' + esc(t.logo) + '" alt="' + esc(t.name) + ' logo" width="' + wh + '" height="' + wh + '" loading="lazy">'
                : t.icon) +
            '</span>';
    };

    var getFavorites = function () {
        try {
            return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
        } catch (e) {
            return [];
        }
    };

    var saveFavorites = function (list) {
        localStorage.setItem(FAV_KEY, JSON.stringify(list));
    };

    var toggleFavorite = function (id) {
        var favs = getFavorites();
        var idx = favs.indexOf(id);
        var added = false;
        if (idx === -1) {
            favs.push(id);
            added = true;
        } else {
            favs.splice(idx, 1);
        }
        saveFavorites(favs);
        return added;
    };

    var renderFavoriteButtons = function () {
        var favs = getFavorites();
        document.querySelectorAll('.fav-btn[data-fav]').forEach(function (btn) {
            var on = favs.indexOf(btn.getAttribute('data-fav')) !== -1;
            btn.classList.toggle('is-fav', on);
            btn.innerHTML = on ? icons.heartFilled : icons.heart;
        });
    };

    var getJson = function (key, fallback) {
        try {
            var v = JSON.parse(localStorage.getItem(key));
            return v === null || v === undefined ? fallback : v;
        } catch (e) {
            return fallback;
        }
    };

    var setJson = function (key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
    };

    var getRecent = function () { return getJson('tooltopia:recent', []); };

    var recordRecent = function (id) {
        var list = getRecent().filter(function (x) { return x !== id; });
        list.unshift(id);
        setJson('tooltopia:recent', list.slice(0, 12));
    };

    var getCompareList = function () { return getJson('tooltopia:compare', []); };

    var setCompareList = function (list) {
        setJson('tooltopia:compare', list);
        renderCompareTray();
    };

    var toggleCompare = function (id) {
        var list = getCompareList();
        if (list.indexOf(id) !== -1) {
            list = list.filter(function (x) { return x !== id; });
        } else {
            if (list.length >= 3) {
                showToast('You can compare up to 3 tools at a time.', 'error');
                return list;
            }
            list.push(id);
            compareTrayOpen = true;
        }
        setCompareList(list);
        return list;
    };

    var getTheme = function () {
        return localStorage.getItem('tooltopia:theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    };

    var applyTheme = function (theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('tooltopia:theme', theme);
        if (themeIconSun && themeIconMoon) {
            themeIconSun.style.display = theme === 'dark' ? '' : 'none';
            themeIconMoon.style.display = theme === 'dark' ? 'none' : '';
        }
    };

    var renderCompareTray = function () {
        var list = getCompareList();
        if (!compareTray || !compareSlots) return;
        compareTray.hidden = !(compareTrayOpen && list.length > 0);
        compareTrayCount.textContent = String(list.length);
        compareCountBadge.textContent = String(list.length);
        compareCountBadge.hidden = list.length === 0;
        compareGoBtn.disabled = list.length < 2;
        compareSlots.innerHTML = list.map(function (id) {
            var t = TOOLS.find(function (x) { return x.id === id; });
            if (!t) return '';
            return '<span class="compare-slot" data-cmp="' + t.id + '">' +
                '<img class="compare-slot-logo" src="' + esc(t.logo) + '" alt="" loading="lazy">' +
                '<span class="compare-slot-name">' + esc(t.name) + '</span>' +
                '<button type="button" class="compare-remove" data-cmp-rm="' + t.id + '" aria-label="Remove ' + esc(t.name) + ' from compare">✕</button>' +
                '</span>';
        }).join('');
        document.querySelectorAll('.compare-btn[data-cmp]').forEach(function (btn) {
            btn.classList.toggle('is-cmp', list.indexOf(btn.getAttribute('data-cmp')) !== -1);
        });
    };

    var openCompare = function () {
        var list = getCompareList();
        if (list.length < 2) {
            showToast('Select at least 2 tools to compare.', 'error');
            return;
        }
        var tools = list.map(function (id) { return TOOLS.find(function (t) { return t.id === id; }); }).filter(Boolean);

        var head = '<tr><th class="cmp-measure">Tool</th>' + tools.map(function (t) {
            return '<th class="cmp-tool"><img class="compare-slot-logo" src="' + esc(t.logo) + '" alt="" loading="lazy"><span>' + esc(t.name) + '</span></th>';
        }).join('') + '</tr>';

        var body = [];
        var row = function (label, fn) {
            return '<tr><th class="cmp-measure" scope="row">' + label + '</th>' + tools.map(function (t) {
                return '<td>' + fn(t) + '</td>';
            }).join('') + '</tr>';
        };

        body.push(row('Category', function (t) { return '<span class="cat-chip">' + esc(t.category) + '</span>'; }));
        body.push(row('Rating', function (t) { return icons.star + ' ' + t.rating.toFixed(1) + ' <span class="rating-count">(' + formatCount(t.ratings) + ')</span>'; }));
        body.push(row('Description', function (t) { return esc(t.desc); }));
        body.push(row('Pricing', function (t) { return '<span class="price-badge ' + priceClass(t.price) + '">' + esc(t.price) + '</span>'; }));
        body.push(row('Key Features', function (t) { return '<ul class="cmp-features">' + t.features.slice(0, 4).map(function (f) { return '<li>' + icons.check + '<span>' + esc(f) + '</span></li>'; }).join('') + '</ul>'; }));
        body.push(row('Action', function (t) { return '<a class="btn btn-primary" href="' + esc(t.url) + '" target="_blank" rel="noopener nofollow sponsored">Visit ' + icons.ext + '</a>'; }));

        compareModalBody.innerHTML =
            '<div class="tool-modal-head"><div><h2>Compare <span class="gradient-text">AI Tools</span></h2><p class="muted">Side-by-side view of selected tools.</p></div></div>' +
            '<div class="compare-table-wrap"><table class="compare-table"><thead>' + head + '</thead><tbody>' + body.join('') + '</tbody></table></div>';

        compareModal.hidden = false;
        document.body.style.overflow = 'hidden';
        compareModal.querySelector('.modal').focus();
    };

    var closeCompare = function () {
        compareModal.hidden = true;
        document.body.style.overflow = '';
    };

    var rankOf = function (id) {
        var sorted = TOOLS.slice().sort(function (a, b) { return b.pop - a.pop; });
        for (var i = 0; i < sorted.length; i++) {
            if (sorted[i].id === id) return i + 1;
        }
        return sorted.length;
    };

    var cardTemplate = function (t, index) {
        var favs = getFavorites();
        var isFav = favs.indexOf(t.id) !== -1;
        var cmpOn = getCompareList().indexOf(t.id) !== -1;
        var delay = ((index % 9) * 45) + 'ms';
        var top3 = rankOf(t.id) <= 3;
        return '<article class="tool-card' + (top3 ? ' card-top' : '') + '" data-id="' + t.id + '" data-slug="' + t.slug + '" role="button" tabindex="0" aria-label="Open details for ' + esc(t.name) + '" style="animation-delay:' + delay + '">' +
            '<div class="tool-card-head">' +
            '<span class="tool-card-head-left">' +
            logoMarkup(t, false) +
            (t.isNew ? '<span class="badge-new">New</span>' : '') +
            '</span>' +
            '<span class="rank-badge">#' + rankOf(t.id) + '</span>' +
            '<div class="tool-card-actions">' +
            '<button type="button" class="btn-icon mini compare-btn' + (cmpOn ? ' is-cmp' : '') + '" data-cmp="' + t.id + '" aria-label="Compare ' + esc(t.name) + '" title="Add to compare">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4"/></svg>' +
            '</button>' +
            '<button type="button" class="btn-icon mini fav-btn" data-fav="' + t.id + '" aria-label="Save ' + esc(t.name) + ' to favorites">' + (isFav ? icons.heartFilled : icons.heart) + '</button>' +
            '</div>' +
            '</div>' +
            '<h3>' + esc(t.name) + '</h3>' +
            '<p class="tool-desc">' + esc(t.desc) + '</p>' +
            '<div class="tool-card-meta">' +
            '<span class="cat-chip">' + esc(t.category) + '</span>' +
            '<span class="rating">' + icons.star + t.rating.toFixed(1) + '<span class="rating-count">(' + formatCount(t.ratings) + ')</span></span>' +
            '</div>' +
            '<div class="tool-card-foot">' +
            '<span class="price-badge ' + priceClass(t.price) + '">' + esc(t.price) + '</span>' +
            '<span class="card-cta">Visit Tool ' + icons.arrow + '</span>' +
            '</div>' +
            '</article>';
    };

    var renderPopular = function () {
        var top = TOOLS.slice().sort(function (a, b) { return b.pop - a.pop; }).slice(0, 6);
        popularGrid.innerHTML = top.map(cardTemplate).join('');
    };

    var renderNew = function () {
        var recent = TOOLS.filter(function (t) { return t.isNew; })
            .sort(function (a, b) { return b.added.localeCompare(a.added); })
            .slice(0, 6);
        var extra = TOOLS.slice().sort(function (a, b) { return b.added.localeCompare(a.added); })
            .filter(function (t) { return !t.isNew; }).slice(0, 6 - recent.length);
        newGrid.innerHTML = recent.concat(extra).map(function (t, i) { return cardTemplate(t, i); }).join('');
    };

    var renderFavorites = function () {
        var favs = getFavorites();
        var tools = favs.map(function (id) { return TOOLS.find(function (t) { return t.id === id; }); }).filter(Boolean);
        favGrid.innerHTML = tools.map(function (t, i) { return cardTemplate(t, i); }).join('');
        favEmpty.hidden = tools.length > 0;
        clearFavBtn.hidden = tools.length === 0;
        headerFavCount.textContent = String(tools.length);
        headerFavCount.hidden = tools.length === 0;
        renderFavoriteButtons();
    };

    var renderRecent = function () {
        var list = getRecent().slice(0, 8).map(function (id) { return TOOLS.find(function (t) { return t.id === id; }); }).filter(Boolean);
        recentGrid.innerHTML = list.map(function (t, i) { return cardTemplate(t, i); }).join('');
        recentEmpty.hidden = list.length > 0;
    };

    var renderStats = function () {
        statCount.textContent = String(TOOLS.length);
        statCategories.textContent = String(CATEGORIES.length);
        var total = TOOLS.reduce(function (s, t) { return s + t.ratings; }, 0);
        statRatings.textContent = total >= 1000 ? (total / 1000).toFixed(1).replace(/\.0$/, '') + 'k+' : String(total);
    };

    var buildSuggestions = function (q) {
        if (!q) { suggestions.hidden = true; suggestions.innerHTML = ''; suggestIndex = -1; return; }
        var term = q.toLowerCase().trim();
        var hits = TOOLS.filter(function (t) {
            var hay = (t.name + ' ' + t.category + ' ' + (t.tags || []).join(' ')).toLowerCase();
            return hay.indexOf(term) !== -1;
        }).slice(0, 7);
        if (!hits.length) {
            suggestions.hidden = true;
            suggestions.innerHTML = '';
            suggestIndex = -1;
            return;
        }
        suggestIndex = -1;
        suggestions.innerHTML = hits.map(function (t, i) {
            return '<button type="button" class="suggest-item" role="option" data-suggest="' + t.name + '" data-slug="' + t.slug + '" id="suggest-' + i + '">' +
                logoMarkup(t, false) +
                '<span class="suggest-name">' + esc(t.name) + '</span>' +
                '<span class="suggest-cat">' + esc(t.category) + '</span>' +
                '</button>';
        }).join('');
        suggestions.hidden = false;
        return hits;
    };

    var filterTools = function (list) {
        var q = currentSearch.toLowerCase().trim();
        var favs = currentFavOnly ? getFavorites() : null;
        return list.filter(function (t) {
            var matchFilter = currentFilter === 'All' || t.category === currentFilter;
            if (!matchFilter) return false;
            if (currentFavOnly && favs.indexOf(t.id) === -1) return false;
            if (currentPrice !== 'All' && t.price !== currentPrice) return false;
            if (!q) return true;
            var hay = (t.name + ' ' + t.desc + ' ' + t.category + ' ' + (t.tags || []).join(' ') + ' ' + t.website).toLowerCase();
            return q.split(/\s+/).every(function (word) { return hay.indexOf(word) !== -1; });
        });
    };

    var sortTools = function (list) {
        var mode = sortSelect.value;
        return list.slice().sort(function (a, b) {
            switch (mode) {
                case 'rating': return (b.rating - a.rating) || (b.ratings - a.ratings);
                case 'newest': return b.added.localeCompare(a.added);
                case 'az': return a.name.localeCompare(b.name);
                default: return b.pop - a.pop;
            }
        });
    };

    var adCellTemplate = function () {
        return '<div class="ad-cell">' +
            '<div class="ad-container ad-inline" role="complementary" aria-label="Advertisement">' +
            '<span>ADVERTISEMENT</span>' +
            '<div class="ad-placeholder">Advertisement Space</div>' +
            '</div>' +
            '</div>';
    };

    var renderDirectory = function () {
        var all = sortTools(filterTools(TOOLS));
        shownCount = Math.min(pageSize, all.length);
        /* reset to page size only when inputs change; keep _shown for load more */
        if (typeof renderDirectory._reset === 'undefined') renderDirectory._reset = true;
        if (renderDirectory._reset) { renderDirectory._shown = pageSize; renderDirectory._reset = false; }
        renderDirectory._list = all;

        var visible = all.slice(0, renderDirectory._shown);
        var html = visible.map(cardTemplate).join('');

        if (visible.length > 8) {
            var insertAt = Math.min(6, visible.length - 1);
            var parts = [];
            for (var i = 0; i < visible.length; i++) {
                parts.push(cardTemplate(visible[i], i));
                if (i === insertAt) parts.push(adCellTemplate());
            }
            html = parts.join('');
        }

        directoryGrid.innerHTML = html;

        var hasResults = all.length > 0;
        emptyState.hidden = hasResults;
        resultCount.textContent = hasResults
            ? 'Showing ' + Math.min(renderDirectory._shown, all.length) + ' of ' + all.length + (all.length === 1 ? ' tool' : ' tools') +
              (currentFavOnly ? ' in Favorites' : '') +
              (currentFilter !== 'All' ? ' in ' + currentFilter : '') +
              (currentPrice !== 'All' ? ' · ' + currentPrice : '') +
              (currentSearch ? ' for "' + currentSearch.trim() + '"' : '')
            : '';

        loadMoreWrap.hidden = renderDirectory._shown >= all.length;
        loadMoreBtn.textContent = 'Load more (' + (all.length - renderDirectory._shown) + ' remaining)';

        document.querySelectorAll('#directory .filter-chip').forEach(function (chip) {
            chip.classList.toggle('is-active', chip.getAttribute('data-filter') === currentFilter);
        });
        document.querySelectorAll('#directory .filter-fav-chip').forEach(function (chip) {
            chip.classList.toggle('is-active', currentFavOnly);
        });
        document.querySelectorAll('#directory .price-chip').forEach(function (chip) {
            chip.classList.toggle('is-active', chip.getAttribute('data-price') === currentPrice);
        });
        renderCompareTray();
        renderFavoriteButtons();
    };

    var openModal = function (tool) {
        lastFocused = document.activeElement;
        recordRecent(tool.id);
        renderRecent();
        var favs = getFavorites();
        var isFav = favs.indexOf(tool.id) !== -1;
        var cmpOn = getCompareList().indexOf(tool.id) !== -1;
        var shareUrl = location.origin + location.pathname + '#/tools/' + tool.slug;

        var related = TOOLS.filter(function (t) {
            return t.category === tool.category && t.id !== tool.id;
        }).sort(function (a, b) { return b.pop - a.pop; }).slice(0, 3);

        modalBody.innerHTML =
            '<div class="tool-modal-head">' +
            logoMarkup(tool, true) +
            '<div>' +
            '<h2 id="modalToolName">' + esc(tool.name) + '</h2>' +
            '<div class="rating">' + icons.star + ' ' + tool.rating.toFixed(1) + ' <span class="rating-count">(' + formatCount(tool.ratings) + ' ratings)</span></div>' +
            '</div>' +
            '<div class="tool-modal-rank">' +
            (tool.isNew ? '<span class="badge-new">New</span>' : '') +
            '<span class="rank-badge rank-badge-lg">#' + rankOf(tool.id) + '</span>' +
            '</div>' +
            '</div>' +
            '<p class="tool-modal-desc">' + esc(tool.desc) + '</p>' +
            '<div class="modal-block"><h3>Key Features</h3><ul class="feature-list">' +
            tool.features.map(function (f) { return '<li>' + icons.check + '<span>' + esc(f) + '</span></li>'; }).join('') +
            '</ul></div>' +
            '<div class="modal-block"><h3>Details</h3><div class="tool-modal-meta">' +
            '<div class="meta-item"><span class="meta-label">Category</span><span class="meta-value"><span class="cat-chip">' + esc(tool.category) + '</span></span></div>' +
            '<div class="meta-item"><span class="meta-label">Rating</span><span class="meta-value">' + icons.star + ' ' + tool.rating.toFixed(1) + ' (' + formatCount(tool.ratings) + ')</span></div>' +
            '<div class="meta-item"><span class="meta-label">Pricing</span><span class="meta-value"><span class="price-badge ' + priceClass(tool.price) + '">' + esc(tool.price) + '</span></span></div>' +
            '<div class="meta-item"><span class="meta-label">Website</span><span class="meta-value"><a href="' + esc(tool.url) + '" target="_blank" rel="noopener nofollow sponsored">' + esc(tool.website) + '</a></span></div>' +
            '<div class="meta-item"><span class="meta-label">Added</span><span class="meta-value">' + formatDate(tool.added) + '</span></div>' +
            '</div></div>' +
            (related.length ? '<div class="modal-block"><h3>Similar Tools</h3><div class="similar-list">' +
                related.map(function (r) {
                    return '<a class="similar-item" href="#/tools/' + r.slug + '" data-similar="' + r.id + '">' +
                        logoMarkup(r, false) +
                        '<span class="similar-info"><strong>' + esc(r.name) + '</strong><span>' + r.rating.toFixed(1) + ' ' + icons.star + '</span></span>' +
                        '<span class="similar-arrow">' + icons.arrow + '</span>' +
                        '</a>';
                }).join('') +
            '</div></div>' : '') +
            '<div class="tool-modal-actions">' +
            '<a class="btn btn-primary" href="' + esc(tool.url) + '" target="_blank" rel="noopener nofollow sponsored">Visit Tool ' + icons.ext + '</a>' +
            '<button type="button" class="btn btn-ghost compare-btn" data-cmp="' + tool.id + '" aria-pressed="' + cmpOn + '">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4"/></svg> Compare</button>' +
            '<button type="button" class="btn btn-ghost" id="shareBtn">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg> Share</button>' +
            '<button type="button" class="fav-btn" data-fav="' + tool.id + '" aria-label="Save ' + esc(tool.name) + ' to favorites">' + (isFav ? icons.heartFilled : icons.heart) + '</button>' +
            '</div>' +
            '<div class="share-popover" id="sharePopover" hidden>' +
            '<button type="button" class="share-item" data-share="copy" data-url="' + esc(shareUrl) + '">🔗 Copy link</button>' +
            '<button type="button" class="share-item" data-share="x" data-url="' + esc(shareUrl) + '" data-text="' + esc('Check out ' + tool.name + ' on ToolTopia') + '">𝕏 Post</button>' +
            '<button type="button" class="share-item" data-share="wa" data-url="' + esc(shareUrl) + '" data-text="' + esc('Check out ' + tool.name + ' on ToolTopia') + '">💬 WhatsApp</button>' +
            '<button type="button" class="share-item" data-share="tg" data-url="' + esc(shareUrl) + '" data-text="' + esc('Check out ' + tool.name + ' on ToolTopia') + '">✈️ Telegram</button>' +
            '<button type="button" class="share-item" data-share="li" data-url="' + esc(shareUrl) + '">💼 LinkedIn</button>' +
            '</div>';

        toolModal.hidden = false;
        document.body.style.overflow = 'hidden';
        history.pushState(null, '', '#/tools/' + tool.slug);
        toolModal.querySelector('.modal').focus();

        var shareBtn = document.getElementById('shareBtn');
        var sharePopover = document.getElementById('sharePopover');
        if (shareBtn) {
            shareBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (sharePopover.hidden) {
                    sharePopover.hidden = false;
                    sharePopover.style.display = 'grid';
                } else {
                    sharePopover.hidden = true;
                    sharePopover.style.display = '';
                }
            });
        }
        if (sharePopover) {
            sharePopover.addEventListener('click', function (e) {
                var item = e.target.closest('[data-share]');
                if (!item) return;
                e.stopPropagation();
                var url = item.getAttribute('data-url');
                var text = item.getAttribute('data-text') || '' ;
                var type = item.getAttribute('data-share');
                if (type === 'copy') {
                    copyToClipboard(url);
                    showToast('Link copied to clipboard.', 'success');
                } else if (type === 'x') {
                    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('Check out ' + tool.name + ' on ToolTopia') + '&url=' + encodeURIComponent(url), '_blank', 'noopener');
                } else if (type === 'wa') {
                    window.open('https://wa.me/?text=' + encodeURIComponent('Check out ' + tool.name + ' on ToolTopia') + '%20' + encodeURIComponent(url), '_blank', 'noopener');
                } else if (type === 'tg') {
                    window.open('https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent('Check out ' + tool.name + ' on ToolTopia'), '_blank', 'noopener');
                } else if (type === 'li') {
                    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url), '_blank', 'noopener');
                }
                sharePopover.hidden = true;
                sharePopover.style.display = '';
            });
        }
        document.querySelectorAll('[data-similar]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                var sim = TOOLS.find(function (t) { return t.id === a.getAttribute('data-similar'); });
                if (sim) openModal(sim);
            });
        });
    };

    var copyToClipboard = function (text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
        } else {
            fallbackCopy(text);
        }
    };

    var fallbackCopy = function (text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
    };

    var closeModal = function () {
        toolModal.hidden = true;
        aboutModal.hidden = true;
        document.body.style.overflow = '';
        if (location.hash.indexOf('#/tools/') === 0 || location.hash.indexOf('#/about') === 0) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    };

    var openAbout = function () {
        lastFocused = document.activeElement;
        aboutModal.hidden = false;
        document.body.style.overflow = 'hidden';
        aboutModal.querySelector('.modal').focus();
    };

    var showToast = function (msg, type) {
        toastEl.textContent = msg;
        toastEl.className = 'toast show' + (type ? ' ' + type : '');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(function () {
            toastEl.classList.remove('show');
        }, 3200);
    };

    var scrollToSection = function (id) {
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    var closeMobileNav = function () {
        mainNav.classList.remove('open');
        menuIcon.style.display = '';
        closeIcon.style.display = 'none';
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    function init() {
        statCount.textContent = String(TOOLS.length);
        renderStats();
        renderPopular();
        renderNew();
        renderDirectory();
        renderFavorites();
        renderRecent();
        renderCompareTray();
        applyTheme(getTheme());

        document.querySelectorAll('.category-count').forEach(function (el) {
            var cat = el.getAttribute('data-count');
            var n = TOOLS.filter(function (t) { return t.category === cat; }).length;
            el.textContent = n + (n === 1 ? ' tool' : ' tools');
        });

        themeToggle.addEventListener('click', function () {
            applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
        });

        headerFavBtn.addEventListener('click', function () {
            scrollToSection('favorites');
        });

        clearFavBtn.addEventListener('click', function () {
            localStorage.removeItem(FAV_KEY);
            renderFavorites();
            renderDirectory();
            showToast('All favorites cleared.', 'success');
        });

        if (cookieBanner && !localStorage.getItem('tooltopia:cookie')) {
            setTimeout(function () { cookieBanner.hidden = false; }, 1200);
        }
        if (cookieAccept) cookieAccept.addEventListener('click', function () {
            localStorage.setItem('tooltopia:cookie', 'accepted');
            cookieBanner.hidden = true;
        });
        if (cookieDecline) cookieDecline.addEventListener('click', function () {
            localStorage.setItem('tooltopia:cookie', 'declined');
            cookieBanner.hidden = true;
        });

        loadMoreBtn.addEventListener('click', function () {
            renderDirectory._shown += pageSize;
            renderDirectory._reset = false;
            renderDirectory();
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 12);
            backToTop.classList.toggle('show', window.scrollY > 600);
        }, { passive: true });

        priceChips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                currentPrice = chip.getAttribute('data-price');
                renderDirectory._reset = true;
                renderDirectory();
            });
        });

        document.querySelectorAll('.filter-fav-chip').forEach(function (chip) {
            chip.addEventListener('click', function () {
                currentFavOnly = !currentFavOnly;
                renderDirectory._reset = true;
                renderDirectory();
                closeMobileNav();
            });
        });

        /* hero search suggestions */
        heroSearchInput.addEventListener('input', function () {
            buildSuggestions(heroSearchInput.value);
        });
        heroSearchInput.addEventListener('focus', function () {
            if (heroSearchInput.value) buildSuggestions(heroSearchInput.value);
        });
        heroSearchInput.addEventListener('keydown', function (e) {
            var items = suggestions.querySelectorAll('.suggest-item');
            if (!items.length) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                suggestIndex = (suggestIndex + 1) % items.length;
                items[suggestIndex].classList.add('is-active');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                suggestIndex = suggestIndex <= 0 ? items.length - 1 : suggestIndex - 1;
                items[suggestIndex].classList.add('is-active');
            } else if (e.key === 'Enter') {
                if (suggestIndex >= 0 && items[suggestIndex]) {
                    e.preventDefault();
                    performSearch(items[suggestIndex].getAttribute('data-suggest'));
                    suggestions.hidden = true;
                    suggestIndex = -1;
                }
            } else if (e.key === 'Escape') {
                suggestions.hidden = true;
                suggestIndex = -1;
            } else {
                items.forEach(function (it) { it.classList.remove('is-active'); });
            }
        });

        suggestions.addEventListener('click', function (e) {
            var item = e.target.closest('.suggest-item');
            if (!item) return;
            performSearch(item.getAttribute('data-suggest'));
            suggestions.hidden = true;
            suggestIndex = -1;
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.hero-search')) {
                suggestions.hidden = true;
                suggestIndex = -1;
            }
        });

        menuToggle.addEventListener('click', function () {
            var open = mainNav.classList.toggle('open');
            menuIcon.style.display = open ? 'none' : '';
            closeIcon.style.display = open ? '' : 'none';
            menuToggle.setAttribute('aria-expanded', String(open));
        });

        document.querySelectorAll('[data-scroll]').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                closeMobileNav();
                var target = el.getAttribute('data-scroll');
                if (target === 'about') {
                    openAbout();
                } else if (target === 'home') {
                    scrollToSection('home');
                    if (el.hasAttribute('data-focus-search')) {
                        setTimeout(function () { heroSearchInput.focus(); }, 500);
                    }
                } else if (el.hasAttribute('data-focus-search')) {
                    scrollToSection('home');
                    setTimeout(function () { heroSearchInput.focus(); }, 500);
                } else {
                    scrollToSection(target);
                }
            });
        });

        heroForm.addEventListener('submit', function (e) {
            e.preventDefault();
            performSearch(heroSearchInput.value);
        });

        document.querySelectorAll('.chip-search').forEach(function (chip) {
            chip.addEventListener('click', function () {
                performSearch(chip.getAttribute('data-query'));
            });
        });

        directorySearch.addEventListener('input', function () {
            currentSearch = directorySearch.value;
            renderDirectory._reset = true;
            renderDirectory();
        });

        clearSearchBtn.addEventListener('click', function () {
            currentSearch = '';
            currentFilter = 'All';
            currentPrice = 'All';
            currentFavOnly = false;
            directorySearch.value = '';
            heroSearchInput.value = '';
            sortSelect.value = 'popular';
            renderDirectory._reset = true;
            renderDirectory();
        });

        sortSelect.addEventListener('change', function () {
            renderDirectory._reset = true;
            renderDirectory();
        });

        document.querySelectorAll('#directory .filter-chip').forEach(function (chip) {
            chip.addEventListener('click', function () {
                currentFilter = chip.getAttribute('data-filter');
                renderDirectory._reset = true;
                renderDirectory();
                chip.classList.add('is-active');
                closeMobileNav();
            });
        });

        categoryGrid.addEventListener('click', function (e) {
            var card = e.target.closest('.category-card');
            if (!card) return;
            currentFilter = card.getAttribute('data-category');
            currentSearch = '';
            currentPrice = 'All';
            currentFavOnly = false;
            directorySearch.value = '';
            renderDirectory._reset = true;
            renderDirectory();
            scrollToSection('directory');
        });

        modalClose.addEventListener('click', closeModal);
        document.querySelectorAll('[data-close-about]').forEach(function (btn) {
            btn.addEventListener('click', closeModal);
        });

        toolModal.addEventListener('click', function (e) {
            if (e.target === toolModal) closeModal();
        });
        aboutModal.addEventListener('click', function (e) {
            if (e.target === aboutModal) closeModal();
        });

        document.addEventListener('keydown', function (e) {
            var tag = (document.activeElement && document.activeElement.tagName) || '';
            var editable = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

            if (e.key === 'Escape') {
                if (!toolModal.hidden) {
                    closeModal();
                    return;
                }
                if (!compareModal.hidden) {
                    closeCompare();
                    return;
                }
                if (mainNav.classList.contains('open')) closeMobileNav();
            }

            if (!editable && (e.key === '/' || (e.ctrlKey && e.key.toLowerCase() === 'k'))) {
                e.preventDefault();
                if (!toolModal.hidden) closeModal();
                if (!compareModal.hidden) closeCompare();
                heroSearchInput.focus();
            }
        });

        document.addEventListener('click', function (e) {
            var favBtn = e.target.closest('.fav-btn[data-fav]');
            if (favBtn) {
                e.stopPropagation();
                var id = favBtn.getAttribute('data-fav');
                var added = toggleFavorite(id);
                var tool = TOOLS.find(function (t) { return t.id === id; });
                if (tool) {
                    showToast(added ? (tool.name + ' saved to favorites') : (tool.name + ' removed from favorites'), added ? 'success' : '');
                }
                renderFavoriteButtons();
                renderFavorites();
                renderDirectory();
                return;
            }

            var cmpBtn = e.target.closest('.compare-btn[data-cmp]');
            if (cmpBtn) {
                e.stopPropagation();
                toggleCompare(cmpBtn.getAttribute('data-cmp'));
                showToast('Comparisons updated.', 'success');
                renderCompareTray();
                renderDirectory();
                return;
            }

            var cmpRm = e.target.closest('[data-cmp-rm]');
            if (cmpRm) {
                e.stopPropagation();
                toggleCompare(cmpRm.getAttribute('data-cmp-rm'));
                renderCompareTray();
                return;
            }

            var card = e.target.closest('.tool-card');
            if (card) {
                var toolObj = TOOLS.find(function (t) { return t.id === card.getAttribute('data-id'); });
                if (toolObj) openModal(toolObj);
                return;
            }

            if (e.target.closest('[data-close-about]')) {
                e.stopPropagation();
                closeModal();
            }

            if (e.target === compareModal) closeCompare();
        });

        compareClearBtn.addEventListener('click', function () {
            setCompareList([]);
            renderDirectory();
            showToast('Compare tray cleared.', 'success');
        });

        compareGoBtn.addEventListener('click', openCompare);
        compareModalClose.addEventListener('click', closeCompare);
        compareBarToggle.addEventListener('click', function () {
            compareTrayOpen = !compareTrayOpen;
            renderCompareTray();
        });

        document.addEventListener('keydown', function (e) {
            if (e.target.classList && e.target.classList.contains('tool-card') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                var toolObj = TOOLS.find(function (t) { return t.id === e.target.getAttribute('data-id'); });
                if (toolObj) openModal(toolObj);
            }
        });

        document.addEventListener('mousemove', function (e) {
            var card = e.target.closest('.tool-card');
            if (card) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
                card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
            }
        });

        window.addEventListener('hashchange', function () {
            var m = location.hash.match(/^#\/tools\/([a-z0-9-]+)/i);
            if (m) {
                var toolObj = TOOLS.find(function (t) { return t.slug === m[1].toLowerCase(); });
                if (toolObj) openModal(toolObj);
                else closeModal();
            } else {
                closeModal();
            }
        });

        window.addEventListener('online', function () { showToast('You are back online.', 'success'); });
        window.addEventListener('offline', function () { showToast('You are offline. Showing cached content.', 'error'); });

        if (location.hash.indexOf('#/tools/') === 0) {
            var initial = location.hash.replace('#/tools/', '');
            var found = TOOLS.find(function (t) { return t.slug === initial; });
            if (found) {
                setTimeout(function () { openModal(found); }, 300);
            }
        }

        if (location.hash.indexOf('#/about') === 0) {
            setTimeout(openAbout, 300);
        }
    }

    function performSearch(query) {
        if (!query) {
            currentSearch = '';
            directorySearch.value = '';
            currentFilter = 'All';
            currentPrice = 'All';
            currentFavOnly = false;
            sortSelect.value = 'popular';
            renderDirectory();
            scrollToSection('directory');
            return;
        }
        currentSearch = query;
        directorySearch.value = query;
        currentFilter = 'All';
        currentPrice = 'All';
        currentFavOnly = false;
        sortSelect.value = 'popular';
        renderDirectory();
        scrollToSection('directory');
        heroSearchInput.blur();
    }

    init();

    function validateEmail(input) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    }

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = document.getElementById('newsletterEmail');
        if (!validateEmail(input)) {
            input.focus();
            newsletterForm.style.borderColor = 'var(--danger)';
            showToast('Please enter a valid email address.', 'error');
            return;
        }
        newsletterForm.style.borderColor = '';
        newsletterForm.reset();
        showToast("You're subscribed! Welcome to ToolTopia.", 'success');
    });
})();