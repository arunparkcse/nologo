/** Site paths like "/contact" route inside the app; anything else is an external URL. */
export const isInternal = (link?: string | null): boolean => !!link && link.startsWith('/');
