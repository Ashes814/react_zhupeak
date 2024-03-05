import { useState, useEffect } from "react";
import { fetchChannelAPI, type ChannelItem } from "@/apis/list";
function useTabs() {
  const [channels, setChannels] = useState<ChannelItem[]>([]);
  useEffect(() => {
    const getChannels = async () => {
      const res = await fetchChannelAPI();
      setChannels(res.data.data.channels);
    };
    getChannels();
  }, []);

  return {
    channels,
  };
}

export { useTabs };
