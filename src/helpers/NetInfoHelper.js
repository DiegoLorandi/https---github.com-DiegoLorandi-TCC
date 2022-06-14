import NetInfo from '@react-native-community/netinfo';

export function isConnected() {
  return NetInfoHelper.isConnected();
}

export default class NetInfoHelper {
  static async isConnected() {
    return NetInfo.fetch().then((state) => state.isConnected);
  }

  static addNetworkListener(callback) {
    NetInfo.addEventListener(callback);
  }
}
