declare namespace Master {

    interface BookForm {
        name: string;
        publisher: string;
        author: string;
        category: string;
    }

    interface BookItem {
        id: number;
        name: string;
        publisher: string;
        author: string;
        category: string;
    }
    interface CategoryItem {
        id: number;
        name: string;
    }
    interface MemberItem {
        id: number;
        name: string;
        memberType: string;
    }   
    interface IssuedBookItem {
        id: number;
        bookId: number;
        memberId: number;
        issueDate: string;
        returnDate?: string;
    }
}