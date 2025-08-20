/**
 * Image Map Resizer
 * This script ensures that the coordinates of an image map scale correctly
 * when the image is resized
 */
(function(){
    function resizeImageMap() {
        const maps = document.querySelectorAll('map');
        const imgTags = document.querySelectorAll('img[usemap]');
        
        imgTags.forEach(img => {
            const mapName = img.getAttribute('usemap').replace('#', '');
            const map = document.querySelector(`map[name="${mapName}"]`);
            
            if (!map) return;
            
            // Get the current dimensions of the image
            const currentWidth = img.clientWidth;
            const currentHeight = img.clientHeight;
            
            // Get the original dimensions of the image (assumed to be the dimensions 
            // at which the coordinates were originally specified)
            const originalWidth = 540; // Based on the image dimensions (adjust if needed)
            const originalHeight = 960; // Based on the image dimensions (adjust if needed)
            
            // Calculate scaling factors
            const widthRatio = currentWidth / originalWidth;
            const heightRatio = currentHeight / originalHeight;
            
            // Update all area coordinates
            const areas = map.querySelectorAll('area');
            areas.forEach(area => {
                const coords = area.getAttribute('coords').split(',');
                const newCoords = [];
                
                // Scale each coordinate
                for (let i = 0; i < coords.length; i++) {
                    if (i % 2 === 0) {
                        // X coordinate
                        newCoords.push(Math.round(coords[i] * widthRatio));
                    } else {
                        // Y coordinate
                        newCoords.push(Math.round(coords[i] * heightRatio));
                    }
                }
                
                area.setAttribute('coords', newCoords.join(','));
            });
        });
    }
    
    // Run on page load
    window.addEventListener('load', resizeImageMap);
    
    // Run on window resize
    window.addEventListener('resize', resizeImageMap);
})();
