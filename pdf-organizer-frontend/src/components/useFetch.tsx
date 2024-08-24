// Fix: Error handling

export const useFetch = async () => {
    try {
        const req = await fetch('/api')
        const data = await req.json()
        return data
    } catch (err) {
        console.error('Something went wrong with useFetch: ' + err)
    }  
}