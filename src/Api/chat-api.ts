const subscribers = {
    'messages-recieved': [] as MessageRecievedSubscribersType[],
    'status-changed': [] as StatusChangedSubscribersType[]
}

let ws: WebSocket | null = null

type EventsNamesType = 'messages-recieved' | 'status-changed'



const closeHandler = () => {
    notifySubscribersAboutStatus('panding')
    console.log('WebSocket is closed. Сheck your internet connection.')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newChatMessages = JSON.parse(e.data)
    subscribers["messages-recieved"].forEach(s => s(newChatMessages))
};

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
};

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('Refresh page')
};

const cleanUp = () => {
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersAboutStatus('panding')
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-recieved"] =[]
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessageRecievedSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        //отписка
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessageRecievedSubscribersType | StatusChangedSubscribersType) {

        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}


type MessageRecievedSubscribersType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscribersType = (status: StatusType) => void

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export type StatusType = 'panding' | 'ready' | 'error';
