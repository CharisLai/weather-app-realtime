// 一般天氣預報-今明 36 小時天氣預報可使用的 locationName
const weatherForcaseLocationNames = [
    '嘉義縣', '新北市', '嘉義市', '新竹縣',
    '新竹市', '臺北市', '臺南市', '宜蘭縣',
    '苗栗縣', '雲林縣', '花蓮縣', '臺中市',
    '臺東縣', '桃園市', '南投縣', '高雄市',
    '金門縣', '屏東縣', '基隆市', '澎湖縣',
    '彰化縣', '連江縣'
]

// 局屬氣象站-現在天氣觀測報告可使用的 locationName
const currentWeatherLocationNames = [
    { locationName: '南沙島', parameter: ['高雄市', '旗津區'] },
    { locationName: '國三N151K', parameter: ['苗栗縣', '苑裡鎮'] },
    { locationName: '國一N174K', parameter: ['臺中市', '西屯區'] },
    { locationName: '嘉義', parameter: ['嘉義市', '西區'] },
    { locationName: '國一S105K', parameter: ['新竹縣', '寶山鄉'] },
    { locationName: '國一N142K', parameter: ['苗栗縣', '銅鑼鄉'] },
    { locationName: '國三S168K', parameter: ['臺中市', '清水區'] },
    { locationName: '國一S132K', parameter: ['苗栗縣', '公館鄉'] },
    { locationName: '國三N119K', parameter: ['苗栗縣', '竹南鎮'] },
    { locationName: '大安森林', parameter: ['臺北市', '大安區'] },
    { locationName: '臺東', parameter: ['臺東縣', '臺東市'] },
    { locationName: '臺北', parameter: ['臺北市', '中正區'] },
    { locationName: '國三S140K', parameter: ['苗栗縣', '通霄鎮'] },
    { locationName: '吉貝', parameter: ['澎湖縣', '白沙鄉'] },
    { locationName: '新屋', parameter: ['桃園市', '新屋區'] },
    { locationName: '國三N208K', parameter: ['臺中市', '霧峰區'] },
    { locationName: '國一N250K', parameter: ['嘉義縣', '大林鎮'] },
    { locationName: '阿里山', parameter: ['嘉義縣', '阿里山鄉'] },
    { locationName: '梧棲', parameter: ['臺中市', '梧棲區'] },
    { locationName: '高雄', parameter: ['高雄市', '前鎮區'] },
    { locationName: '國三S178K', parameter: ['臺中市', '沙鹿區'] },
    { locationName: '東吉島', parameter: ['澎湖縣', '望安鄉'] },
    { locationName: '國三S156K', parameter: ['苗栗縣', '苑裡鎮'] },
    { locationName: '成功', parameter: ['臺東縣', '成功鎮'] },
    { locationName: '國一S152K', parameter: ['苗栗縣', '三義鄉'] },
    { locationName: '古坑', parameter: ['雲林縣', '古坑鄉'] },
    { locationName: '基隆', parameter: ['基隆市', '仁愛區'] },
    { locationName: '國一S123K', parameter: ['苗栗縣', '頭屋鄉'] },
    { locationName: '蘭嶼', parameter: ['臺東縣', '蘭嶼鄉'] },
    { locationName: '國三S202K', parameter: ['彰化縣', '彰化市'] },
    { locationName: '臺中', parameter: ['臺中市', '北區'] },
    { locationName: '國三S173K', parameter: ['臺中市', '清水區'] },
    { locationName: '國一S207K', parameter: ['彰化縣', '大村鄉'] },
    { locationName: '新竹', parameter: ['新竹縣', '竹北市'] },
    { locationName: '淡水', parameter: ['新北市', '淡水區'] },
    { locationName: '國三S217K', parameter: ['南投縣', '草屯鎮'] },
    { locationName: '合歡山', parameter: ['花蓮縣', '秀林鄉'] },
    { locationName: '九宮碼頭', parameter: ['金門縣', '烈嶼鄉'] },
    { locationName: '澎湖', parameter: ['澎湖縣', '馬公市'] },
    { locationName: '板橋', parameter: ['新北市', '板橋區'] },
    { locationName: '彭佳嶼', parameter: ['基隆市', '中正區'] },
    { locationName: '國三N223K', parameter: ['南投縣', '草屯鎮'] },
    { locationName: '鞍部', parameter: ['臺北市', '北投區'] },
    { locationName: '新店', parameter: ['新北市', '新店區'] },
    { locationName: '宜蘭', parameter: ['宜蘭縣', '宜蘭市'] },
    { locationName: '大武', parameter: ['臺東縣', '大武鄉'] },
    { locationName: '國三N196K', parameter: ['彰化縣', '彰化市'] },
    { locationName: '國四E5K', parameter: ['臺中市', '神岡區'] },
    { locationName: '蘇澳', parameter: ['宜蘭縣', '蘇澳鎮'] },
    { locationName: '武陵', parameter: ['臺中市', '和平區'] },
    { locationName: '國一S162K', parameter: ['臺中市', '后里區'] },
    { locationName: '竹子湖', parameter: ['臺北市', '北投區'] },
    { locationName: '恆春', parameter: ['屏東縣', '恆春鎮'] },
    { locationName: '國一S188K', parameter: ['臺中市', '大肚區'] },
    { locationName: '玉山', parameter: ['南投縣', '信義鄉'] },
    { locationName: '麥寮', parameter: ['雲林縣', '麥寮鄉'] },
    { locationName: '國一S169K', parameter: ['臺中市', '神岡區'] },
    { locationName: '金門', parameter: ['金門縣', '金城鎮'] },
    { locationName: '金門(東)', parameter: ['金門縣', '金湖鎮'] },
    { locationName: '彰��大', parameter: ['彰化縣', '彰化市'] },
    { locationName: '國三N191K', parameter: ['彰化縣', '和美鎮'] },
    { locationName: '太魯閣', parameter: ['花蓮縣', '秀林鄉'] },
    { locationName: '國一N198K', parameter: ['彰化縣', '彰化市'] },
    { locationName: '東沙島', parameter: ['高雄市', '旗津區'] },
    { locationName: '拉拉山', parameter: ['桃園市', '復興區'] },
    { locationName: '國一S114K', parameter: ['苗栗縣', '頭份市'] },
    { locationName: '南區中心', parameter: ['臺南市', '中西區'] },
    { locationName: '日月潭', parameter: ['南投縣', '魚池鄉'] },
    { locationName: '花蓮', parameter: ['花蓮縣', '花蓮市'] },
    { locationName: '國三N252K', parameter: ['雲林縣', '林內鄉'] },
    { locationName: '田中', parameter: ['彰化縣', '田中鎮'] },
    { locationName: '國一N234K', parameter: ['雲林縣', '西螺鎮'] },
    { locationName: '馬祖', parameter: ['連江縣', '南竿鄉'] },
    { locationName: '永康', parameter: ['臺南市', '永康區'] }
]

// 日出日沒時刻-全臺各縣市年度逐日日出日沒時刻可使用的 locationName
const sunsetSunriseLocationNames = [
    '臺北市', '新北市', '桃園市', '新竹縣',
    '苗栗縣', '臺中市', '彰化縣', '南投縣',
    '雲林縣', '嘉義市', '臺南市', '高雄市',
    '屏東縣', '基隆市', '宜蘭縣', '花蓮縣',
    '臺東縣', '澎湖縣', '金門縣', '連江縣',
    '新竹市', '嘉義縣'
]