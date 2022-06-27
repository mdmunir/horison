uniform float esq;
uniform float mu;
uniform float x;
uniform float y;
uniform float cosd;
uniform float sind;
uniform float l1;
uniform float l2;
uniform float tanf1;
uniform float tanf2;
uniform sampler2D txtr;
varying vec2 vUv;

void main(void){
    vec2 position = -1.0 + 2.0 * vUv;
    float lat = radians(position.y * 90.0);
    float lng = radians(position.x * 180.0);
    float cosLat = cos(lat);
    float sinLat = sin(lat);
    float theta = mu + lng;
    float C = 1.0 / sqrt(1.0 - esq * sinLat * sinLat);
    float S = (1.0 - esq) * C;
    float xi = C * cosLat * sin(theta);
    float eta = S * sinLat * cosd - C * cosLat * sind * cos(theta);
    float zeta = S * sinLat * sind + C * cosLat * cosd * cos(theta);
    float u = x - xi;
    float v = y - eta;
    float m = sqrt(u * u + v * v);
    float L1 = l1 - zeta * tanf1;
    float L2 = l2 - zeta * tanf2;
    vec3 color = texture2D( txtr, vUv ).rgb;
    if (zeta < 0.0){
        float fac = 0.4;
        gl_FragColor = vec4(color.x * fac, color.y * fac, color.z * fac, 1.0 );
    } else if (L2 < 0.0 && m < -L2 && zeta > 0.0){
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 );
    } else if (L2 > 0.0 && m < L2 && zeta > 0.0){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0 );
    } else if (m < L1 && zeta > 0.0){
        float f = 0.7 - 0.0 * (L1 - m) / L1;
        gl_FragColor = vec4(color.x * f, color.y * f, color.z * f, 1.0 );
    } else{
        gl_FragColor = vec4( color.x, color.y, color.z, 1.0 );
    }
}