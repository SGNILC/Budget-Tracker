import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing } from "../../constants/themes";
import { parseVeryfiResponse } from '../../utils/parseVeryfiResponse';
import { scanReceiptWithVeryfi } from '../../utils/veryfiService';
import { VERYFI_CLIENT_ID } from '../../constants/veryfi';
// ... other imports

export default function CameraModal() {
    const [hasPermission, setHasPermission] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [showTitle, setShowTitle] = useState(false); // State for delayed title
    const cameraRef = useRef(null);
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current; // For the blend effect
    const [isUploading, setIsUploading] = useState(false) // checks if the receipt has been uploaded to the veryfi system

    async function handleUsePhoto() {
        // informs if the credentials are missing
        Alert.alert("Debug", `Client ID: ${VERYFI_CLIENT_ID ? "present" : "MISSING"}`);
           setIsUploading(true)

           try {
            // const result = await scanReceiptWithVeryfi(photo.uri);
            // const parsedResults =  parseVeryfiResponse(result);
            // if (!parsedResults) throw new Error('Could not read receipt. Please try again or enter manually.');
console.log("Photo object:", JSON.stringify(photo));
            console.log("Step 1: starting scan...");
    const result = await scanReceiptWithVeryfi(photo.uri);
    console.log("Step 2: Veryfi response:", JSON.stringify(result));
    const parsedResults = parseVeryfiResponse(result);
    console.log("Step 3: parsed:", JSON.stringify(parsedResults));
    if (!parsedResults) throw new Error("Could not parse receipt");
             router.replace(
                `/(tabs)/Add_Transaction?amount=${encodeURIComponent(parsedResults.amount)}&date=${encodeURIComponent(parsedResults.date)}&description=${encodeURIComponent(parsedResults.description)}&category=${encodeURIComponent(parsedResults.category)}`
            );
            
           } catch (error) {
            // console.log("Scan error:", error.message)
            // Alert.alert(
            //     "Scan Failed",
            //     "We couldn't read your receipt. Please retake the photo or enter details manually.",
            //     [
            //         {text: "Enter Manually", onPress: () => {
            //             router.replace('/(tabs)/Add_Transaction')
            //         }},
            //         {text: "Retake", onPress: () => {
            //             setPhoto(null)
            //         }}
            //     ]
            // )
            Alert.alert("Scan Failed", error.message || "Unknown error")

           } finally {
            setIsUploading(false);
           }

        };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");

            Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
        })();

        // Delay the title appearance slightly so it feels smoother after the slide-up
        const timer = setTimeout(() => setShowTitle(true), 400);
        return () => clearTimeout(timer);
    }, []);

    if (hasPermission === null) {
        return <View style={styles.center}><ActivityIndicator size="large" color={colors.white} /></View>;
    }

    if (photo) {
        return (
            <View style={styles.previewContainer}>
                {/* Header Title for Preview */}
                <Text style={styles.headerTitle}>Review Receipt</Text>
                
                <Image source={{ uri: photo.uri }} style={styles.preview} />
                
                {isUploading ? (
                    <ActivityIndicator size="large" color={colors.white}/>
                ) : (
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => setPhoto(null)}>
                        <Text style={styles.actionButtonText}>Retake</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.confirmButton]} 
                        onPress={handleUsePhoto}
                    >
                        <Text style={[styles.actionButtonText, styles.confirmButtonText]}>Use Photo</Text>
                    </TouchableOpacity>
                </View>)}
                
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* ANIMATED BLENDED TITLE */}
            <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
                <Text style={styles.headerTitle}>Scan Receipt</Text>
            </Animated.View>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing="back"
                onCameraReady={() => setIsCameraReady(true)}
            />

            {/* Dynamic Title: Only shows after transition */}
            {showTitle && (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Scan Receipt</Text>
                </View>
            )}

            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.shutterButton}
                    onPress={async () => {
                        if (cameraRef.current && isCameraReady) {
                            const photoData = await cameraRef.current.takePictureAsync();
                            setPhoto(photoData);
                        }
                    }}    
                />
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <Text style={styles.closeText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.primary 
  },
  camera: { 
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 100,
    marginBottom: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 60, // Consistent with your "Scan" view
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', // Centers text perfectly
    zIndex: 10,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  controls: {
    position: "absolute",
    bottom: 35,
    width: "100%",
    alignItems: "center",
  },
  shutterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    borderWidth: 6,
    borderColor: 'rgba(10, 35, 28, 0.3)',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(29, 8, 8, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 25,
  },
  closeText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  previewContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: spacing.statusBarHeight,
    paddingHorizontal: 10, // Match camera margin for alignment
    alignItems: 'center',
  },
  preview: {
    width: "100%",
    flex: 1,
    marginTop: 80, // Space for the "Review" title
    borderRadius: 30,
    borderWidth: 1,  
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonRow: {
    flexDirection: "row",
    width: '100%', // Ensure buttons stretch to image edges
    justifyContent: "space-between",
    marginTop: 20,
    gap: 15,
    marginBottom: 50,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    // ADDED ELEVATION & SHADOW
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,   
  },
  confirmButton: {
    backgroundColor: colors.actionOrange,
    // MATCHING ELEVATION
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  actionButtonText: {
    color: colors.black, // Fixed the 'bl' typo to your theme teal
    fontWeight: "bold",
    fontSize: 16,
  },
  confirmButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
});