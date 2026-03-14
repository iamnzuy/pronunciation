export const SkeletonPractice = () => {
    const handleClose = () => router.back();
  
    return (
      <SafeAreaView className="flex h-full flex-col justify-center gap-6 bg-white">
        <View className="relative w-full flex flex-col border-b border-grey-100 items-center gap-4 min-h-[56.9%] p-4" style={{ boxShadow: "-9px 16px 5px 0 rgba(0, 0, 0, 0.00), -6px 11px 5px 0 rgba(0, 0, 0, 0.01), -3px 6px 4px 0 rgba(0, 0, 0, 0.05), -1px 3px 3px 0 rgba(0, 0, 0, 0.09), 0 1px 2px 0 rgba(0, 0, 0, 0.10)" }}>
          <View className="flex-row items-center justify-between w-full">
            <TouchableOpacity onPress={handleClose} className="w-9 h-9 rounded-full border border-grey-100 items-center justify-center">
              <X size={20} className="text-dark-75" />
            </TouchableOpacity>
            <View className="relative w-24 h-14 rounded-lg bg-neutral-200 animate-pulse"/>
          </View>
  
          <View className="flex flex-row gap-8 items-center justify-start h-8 w-4/5 mr-auto px-3">
            <View className="h-1.5 flex-1 bg-grey-100 rounded-full w-full relative">
              <View className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-secondary-01 w-8 h-8 rounded-full flex items-center justify-center z-10">
                <LoadingProgressSvg width={16} height={16} />
              </View>
            </View>
          </View>
  
          <View className="flex-1 min-h-0 w-full border border-grey-100 rounded-3xl p-4 flex flex-col gap-6 bg-neutral-200 animate-pulse" style={{ shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}/>
          <View className="flex flex-row justify-between items-center w-full">
            <View className="w-24 h-full bg-neutral-200 animate-pulse flex-row items-center justify-between gap-2 border border-gray-200 rounded-full py-2.5 px-4"/>
            <TouchableOpacity className="py-2.5 px-4 rounded-full bg-secondary-01">
              <CText className="text-white font-bold text-t3-bold">Nộp bài</CText>
            </TouchableOpacity>
          </View>
        </View>
  
        <View className="flex-1 mx-4 rounded-2xl border border-gray-100 overflow-hidden">
          <View className="px-4 pt-3 pb-2 flex-row items-center justify-between">
            <CText className="text-t3-bold">Danh sách luyện tập</CText>
          </View>
          <View className="flex-1 flex flex-col gap-2 px-3">
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <View key={index} className={cn("flex-row h-10 w-full bg-neutral-200 animate-pulse items-center px-4 py-3 rounded-lg")}/>
              );
            })}
          </View>
        </View>
      </SafeAreaView >
    );
  }