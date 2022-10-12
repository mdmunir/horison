const int orde = 4;
uniform float SHa[orde];
uniform float SDec[orde];
uniform float MHa[orde];
uniform float MDec[orde];
uniform float EqTime[orde];
uniform float hp;
uniform float eot;
uniform float elongation; // derajat
uniform float altitude; // derajat
uniform sampler2D txtr;

varying vec2 vUv;
const float pi = 3.14159;
const float R2D = 57.29578;
const float ER = 0.02;

struct horizon {
    float alt;
    float az;
};

horizon fAltAz(float h, float d, float lat){
    return horizon(asin(sin(lat)*sin(d) + cos(lat)*cos(d)*cos(h)),
        atan(sin(h), cos(h) * sin(lat) - (sin(d) / cos(d)) * cos(lat)));
}

float horner(float t, float c[orde]){    
    int i = c.length() - 1;
    float res = c[i];
    while(i > 0){
        i--;
        res = res*t + c[i];
    }
    return res;
}

void main(void){
    vec2 position = -1.0 + 2.0 * vUv;
    float lat = radians(position.y * 90.0);
    float lng = radians(-position.x * 180.0);
    vec3 color = texture2D(txtr, vUv).rgb;
    
    float t = lng/(2.0*pi);
    t = t - horner(t, EqTime);
    float delta = horner(t, SDec);
    float cosHa = (-0.014538081 - sin(lat)*sin(delta))/(cos(lat)*cos(delta));
    float fac = 0.2;
    if(cosHa > -1.0 && cosHa < 1.0){ // ada terbenam
        float ha = acos(cosHa);
        t = t + ha/(2.0 * pi);

        float sHa = horner(t, SHa);
        float sDec = horner(t, SDec);
        float mHa = horner(t, MHa);
        float mDec = horner(t, MDec);
        
        horizon sun = fAltAz(sHa-lng, sDec, lat);
        horizon moon = fAltAz(mHa-lng, mDec, lat);

        moon.alt = moon.alt - hp*cos(moon.alt) + 0.00989;
        sun.alt = sun.alt + 0.0145;

        float alt = (moon.alt - sun.alt) * R2D;
        float cosElo = sin(sun.alt)*sin(moon.alt) + cos(sun.alt)*cos(moon.alt) * cos(sun.az - moon.az);
        float elo = acos(cosElo) * R2D;

        if(alt > altitude && abs(elo-elongation) < ER * 0.5){
            gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0 );
        }else if(alt >= 0.0 && fract(alt) < ER){
            gl_FragColor = vec4(0.8, 0.8, 0.0, 1.0 );
        }else if(alt > altitude && elo > elongation) {
            gl_FragColor = vec4(color.x, color.y, color.z, 1.0 );
        }else if(alt > 0.0){
            gl_FragColor = vec4(color.x, color.y * 0.5, color.z * 0.5, 1.0 );
        }else{
            fac = 0.3;
            gl_FragColor = vec4(color.x * fac, color.y * fac, color.z * fac, 1.0 );
        }
    }else{
        gl_FragColor = vec4(color.x * fac, color.y * fac, color.z * fac, 1.0 );
    }
}