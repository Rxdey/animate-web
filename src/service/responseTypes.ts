export interface ResponseType<T> {
    state?: number;
    msg?: string;
    data?: T
}

export interface CollectionData {
    id: string | number;
    userId: string | number;
    source: string;
    animateId: string | number;
    animateName: string;
    cover?: string;
    lastChapterId?: string | number;
    lastChapter?: string;
    lastChapterName?: string;
    lastPage?: string;
    isShow: string|number;
    updateDate: string;
    createDate: string;
    state: number;
}