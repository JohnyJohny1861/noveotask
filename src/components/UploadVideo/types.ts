import { Props as AlertProps } from "../../UI/Alert/types"

export type Props = {
    setAlert: (val:AlertProps) => void
    setLoading: (val:boolean) => void,
    onFileUploaded: () => void,
}

export type State = {
    alertType: string | undefined,
    alertMsg: string | undefined
}