class SMTP {

    /*
     *
     * Send an email by calling the backend API.
     * @author jimBoYz Ni ChOy!!!
     * May 26, 2025 Mon. 5:30 PM
     * Updated June 03, 2025 Tue. 4:41PM
     * @param {Object} options - email options: { name, recipient (to), subject, message (body) }
     * 
     */

    static async send(input) {

        let body, headers;

        if(input instanceof FormData) {
            headers = {};
            body = input;
        } else {
            headers = {'Content-Type' : 'application/json'};
            body = JSON.stringify(input);
        }

        try {
            
            const res = await fetch('http://email-sender-8cp9u4q3e-jimboyz-js-projects.vercel.app/send-email', {
                method:'POST',
                headers,
                body,
            })
           
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
            return await res.json();

        } catch(err) {
            console.error(err);
        }
    }
}

window.SMTP = SMTP;