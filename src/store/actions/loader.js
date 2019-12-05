export const TOGGLE_PRELOADER = "TOGGLE_PRELOADER";

export const toggleLoader = isLoading => { 
    return {
        type: TOGGLE_PRELOADER,
        payload: isLoading
    }
};