// 🟡 Importa el middleware de limitación de tasa de express-rate-limit.
const rateLimit = require('express-rate-limit');

// 🟡 Lista de User-Agents de bots conocidos que no están permitidos.
const botUserAgents = [
    "Prerender", "Googlebot", "Google\\+", "bingbot", "Googlebot-Mobile", "seochat", "SemrushBot", "SemrushBot-SA",
    "Bot", "SEOChat", "Baiduspider", "Yahoo", "YahooSeeker", "DoCoMo", "Twitterbot", "TweetmemeBot", "Twikle",
    "Netseer", "Daumoa", "SeznamBot", "Ezooms", "MSNBot", "Exabot", "MJ12bot", "sogou\\sspider", "YandexBot",
    "bitlybot", "ia_archiver", "proximic", "spbot", "ChangeDetection", "NaverBot", "MetaJobBot", "magpie-crawler",
    "Genieo\\sWeb\\sfilter", "Qualidator.com\\sBot", "Woko", "Vagabondo", "360Spider", "ExB\\sLanguage\\sCrawler",
    "AddThis.com", "aiHitBot", "Spinn3r", "BingPreview", "GrapeshotCrawler", "CareerBot", "ZumBot", "ShopWiki",
    "bixocrawler", "uMBot", "sistrix", "linkdexbot", "AhrefsBot", "archive.org_bot", "SeoCheckBot", "TurnitinBot",
    "VoilaBot", "SearchmetricsBot", "Butterfly", "Yahoo!", "Plukkie", "yacybot", "trendictionbot", "UASlinkChecker",
    "Blekkobot", "Wotbox", "YioopBot", "meanpathbot", "TinEye", "LuminateBot", "FyberSpider", "Infohelfer",
    "linkdex.com", "Curious\\sGeorge", "Fetch-Guess", "ichiro", "MojeekBot", "SBSearch", "WebThumbnail",
    "socialbm_bot", "SemrushBot", "Vedma", "alexa\\ssite\\saudit", "SEOkicks-Robot", "Browsershots", "BLEXBot",
    "woriobot", "AMZNKAssocBot", "Speedy", "oBot", "HostTracker", "OpenWebSpider", "WBSearchBot", "FacebookExternalHit",
    "Google-Structured-Data-Testing-Tool", "baiduspider", "facebookexternalhit", "twitterbot", "rogerbot",
    "linkedinbot", "embedly", "quora\\slink\\spreview", "showyoubot", "outbrain", "pinterest", "slackbot",
    "vkShare", "W3C_Validator"
];

// 🟡 Configuración de limitación de tasa con express-rate-limit.
exports.limiTotal = rateLimit({
    windowMs: 15 * 60 * 1000, // 🟡 Establece la ventana de tiempo a 15 minutos.
    max: 100, // 🟡 Limita cada IP a 100 solicitudes por ventana de tiempo.
    handler: (req, res, next) => {
        const userAgent = req.get('User-Agent'); // 🟡 Obtiene el User-Agent de la solicitud.
        // 🟡 Verifica si el User-Agent coincide con alguno de los patrones de bots conocidos.
        if (userAgent && botUserAgents.some(bot => new RegExp(bot, 'i').test(userAgent))) {
            // 🟡 Responde con un error 403 si se detecta un bot.
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Bot access is not allowed.' // 🟡 Mensaje de error para el acceso no permitido.
            });
        }
        // 🟡 Responde con un error 429 si se excede el límite de solicitudes.
        res.status(429).json({
            message: 'You have made too many requests in a short period of time. Please try again later.' // 🟡 Mensaje de límite de tasa.
        });
    }
});
