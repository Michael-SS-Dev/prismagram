// on임에 주의
export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment{
        id
        text
        user {
            username
        }
    }
`;
