// const url = "https://main.dswefqembk1hc.amplifyapp.com"
const url = 'http://0.0.0.0:5001'

let now = new Date()
now.setMinutes(now.getMinutes() - 20)
const day_ago = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
const week_ago = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
const month_ago = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
function sendLogs(status: 'success' | 'failure') {
    for (let d = day_ago; d <= now; d.setHours(d.getHours() + 1)) {
        const users = Array.from({ length: 10 }, (_, i) => String(i + 1 + 30))

        users.forEach(async user_id => {
            const data = {
                user_id,
                status,
                timestamp: d.getTime(),
                error_message: status === 'failure' ? 'The scary error message' : '',
                request: "{}",
                response: "{}"
            }
            const res = await fetch(url + '/api/record', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res)
        })
    }
}

sendLogs("success")