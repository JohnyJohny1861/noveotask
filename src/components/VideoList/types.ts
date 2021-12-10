export type Props = {
    loading: boolean
    videos: VideosType
}

export type VideosType = {id: number, name: string, url: string}[]
