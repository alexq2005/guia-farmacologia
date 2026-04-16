// ============================================================
// Share drug info as a visual card image
// ============================================================

import { Platform } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

/** Capture a ViewShot ref and share as image */
export async function shareViewAsImage(
  viewShotRef: React.RefObject<ViewShot | null>,
  title: string,
): Promise<void> {
  try {
    const uri = await viewShotRef.current?.capture?.();
    if (!uri) throw new Error('Capture failed');

    await Share.open({
      title,
      url: Platform.OS === 'android' ? `file://${uri}` : uri,
      type: 'image/png',
      failOnCancel: false,
    });
  } catch (error: any) {
    // User cancelled share — not an error
    if (error?.message?.includes('cancel')) return;
    console.warn('[ShareImage] Error:', error);
  }
}
