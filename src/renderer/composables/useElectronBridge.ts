import { ref, onMounted } from 'vue';

const expose: any = window;
const electron = expose.electron;

interface Props {
  format: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useElectronBridge(props: Props) {
  onMounted(() => {
    electron.receive('fileConverted', (base64: string, newPath: string) => {
      isConverted(base64, newPath);
    });
    electron.receive('isError', () => {
      isError(true);
    });
  });

  // Data
  const totalFiles = ref(0);
  const isLoading = ref(false);
  const images = ref([] as Items);
  //const images = ref([]) as Ref<Items>;
  const progress = ref(0);

  // Private
  let indexItem = 0;
  let resolvePromise: any = null;

  // Public Methods
  const loopFiles = async (files: FileList) => {
    isLoading.value = true;
    totalFiles.value = files.length;
    for (let i = 0; i < files.length; i++) {
      const file: MyFile = files[i];
      await convertFile(file);
    }
  };

  const openLink = async (path: string) => {
    await electron.showItemInFolder(path);
  };

  // Methods
  const convertFile = function (file: MyFile) {
    return new Promise((resolve) => {
      if (
        (file.type && file.type !== 'image/heic') ||
        !/\.heic$/i.test(file.name.toLowerCase())
      ) {
        fileTypeError();
        return resolve('isError');
      }
      resolvePromise = resolve;

      const fileName = file.name;
      const filePath = file.path;
      const shortenFileName =
        fileName.length > 10 ? fileName.substring(0, 10) + '...' : fileName;
      const outputFormat = props.format;

      // Set a preview version
      images.value.push({
        src: '',
        name: shortenFileName,
        path: '',
        format: outputFormat
      });

      // Send to Electron
      electron.send('convertToHeic', { filePath, outputFormat });
    });
  };

  const isConverted = function (base64: string, fullPath: string) {
    const arrPosition = images.value.length - 1;
    images.value[arrPosition].src = base64;
    images.value[arrPosition].path = fullPath;

    setProgressAndResolve();
    resetOnComplete();
  };

  const isError = (backendError?: boolean) => {
    if (backendError) {
      const arrPosition = images.value.length - 1;
      images.value[arrPosition].error = true;
      setProgressAndResolve();
    } else {
      totalFiles.value += -1;
    }
    resetOnComplete();
  };

  const setProgressAndResolve = () => {
    indexItem++;
    progress.value = (indexItem * 100) / totalFiles.value;
    resolvePromise();
  };

  const loopCompleted = () => {
    return indexItem === totalFiles.value;
  };

  const resetOnComplete = () => {
    loopCompleted() && reset();
  };

  const reset = () => {
    isLoading.value = false;
    progress.value = 0;
    indexItem = 0;
  };

  const fileTypeError = () => {
    electron.send('showFileTypeError');
    isError();
  };

  return { progress, isLoading, images, loopFiles, openLink };
}
