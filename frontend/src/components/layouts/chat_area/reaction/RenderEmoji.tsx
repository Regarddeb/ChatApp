interface RenderEmojiProps {
    unifiedCode: string
}

export const RenderEmoji: React.FC<RenderEmojiProps> = ({ unifiedCode }) => {
    const emoji = String.fromCodePoint(parseInt(unifiedCode, 16));

    return emoji;
}