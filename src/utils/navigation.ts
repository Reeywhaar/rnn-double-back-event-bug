import { useEffect } from "react";
import { Navigation, Options } from "react-native-navigation";

export function useBackNavigationHandler(
  componentId: string,
  callback: () => unknown,
  deps: any[]
) {
  useEffect(() => {
    const subscription =
      Navigation.events().registerNavigationButtonPressedListener((event) => {
        if (
          event.componentId === componentId &&
          (event.buttonId === 'RNN.back' ||
            event.buttonId === 'RNN.hardwareBackButton')
        ) {
          callback();
        }
      });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentId, ...deps]);
}

export function setBackNavigation(
  /**
   * If handled no default action will be fired.
   * Instead controller should subscribe to RNN.Back and others
   * and handle back navigation itself.
   */
  backHandled: boolean,
  opts?: Options
): Options {
  return {
    ...opts,
    hardwareBackButton: {
      popStackOnPress: !backHandled,
      dismissModalOnPress: !backHandled,
      ...opts?.hardwareBackButton,
    },
    topBar: {
      ...opts?.topBar,
      backButton: {
        popStackOnPress: !backHandled,
        ...opts?.topBar?.backButton,
      },
    },
  };
}
