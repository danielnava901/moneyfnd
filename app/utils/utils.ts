
type MyB = {
    status: number,
    body: string
}

const fetcher = async <T>(body: T) => {
    return body
}

const f = fetcher("");