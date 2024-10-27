const float THRESHOLD = 0.0015;
const float THRESHOLD2 = 0.0025;

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
uniform float deltaTMu;
uniform int isAe;
uniform int isPath;

uniform float X[4];
uniform float Y[4];
uniform float D[4];
uniform float MU[4];
uniform float L1[4];
uniform float L2[4];
uniform float DX[4];
uniform float DY[4];
uniform float DD[4];
uniform float DMU[4];
//uniform float DL1[4];
//uniform float DL2[4];
uniform sampler2D txtr;
varying vec2 vUv;

float horner(float t, float series[4]){
    int i = 3;
    float result = series[i];
    while(i > 0){
        i--;
        result = result*t + series[i];
    }
    return result;
}

void main(void){
    vec2 position = -1.0 + 2.0 * vUv;
    float lat = radians(position.y * 90.0);
    float lon = radians(position.x * 180.0);
    vec2 pos = vec2(vUv.x, vUv.y);
    if(isAe == 1){
        float r = sqrt(position.y*position.y+position.x*position.x);
        lat = radians(90.0 - 180.0*r);    
        lon = atan(position.y,position.x);        
        pos.x = lon / 3.14159 / 2.0 + 0.5;
        pos.y = 1.0 - r;
    }

    vec3 color = texture2D(txtr, pos).rgb;
    float cosLat = cos(lat);
    float sinLat = sin(lat);
    float C = 1.0 / sqrt(1.0 - esq * sinLat * sinLat);
    float S = (1.0 - esq) * C;
    float tmp = atan(0.99664719 * tan(lat));
    float rhoS = 0.99664719*sin(tmp);
    float rhoC = cos(tmp);

    int pathFound = 0;
    if(isPath == 1){
        float t = 0.0;
        float dt = 0.0;
        float _x;
        float _y;
        float _d;
        float _mu;
        float _dx;
        float _dy;
        float _dd;
        float _dmu;
        float _cosd;
        float _sind;
        float _h;
        float _sinh;
        float _cosh;
        float _xi;
        float _eta;
        float _zeta;
        float _dxi;
        float _deta;
        float _u;
        float _v;
        float _a;
        float _b;
        float _n2;

        int mid = 0;
        for(int it=0; it < 15; it++){
            _x = horner(t, X);
            _y = horner(t, Y);
            _d = horner(t, D);
            _mu = horner(t, MU);
            _dx = horner(t, DX);
            _dy = horner(t, DY);
            _dd = horner(t, DD);
            _dmu = horner(t, DMU);
            //_dl1 = horner(t, DL1);
            //_dl2 = horner(t, DL2);
            _cosd = cos(_d);
            _sind = sin(_d);

            _h = _mu + lon - deltaTMu;
            _sinh = sin(_h);
            _cosh = cos(_h);

            //_xi = rhoC * _sinh;
            //_eta = rhoS * _cosd - rhoC * _cosh * _sind;
            //_zeta = rhoS * _sind + rhoC * _cosh * _cosd;
            _xi = C * cosLat * sin(_h);
            _eta = S * sinLat * _cosd - C * cosLat * _sind * cos(_h);
            _zeta = S * sinLat * _sind + C * cosLat * _cosd * cos(_h);

            _dxi = _dmu * rhoC * _cosh;
            _deta = _dmu * _xi * _sind - _zeta * _dd;
            _u = _x - _xi;
            _v = _y - _eta;
            _a = _dx - _dxi;
            _b = _dy - _deta;
            _n2 = _a*_a + _b*_b;

            dt = (_u*_a + _v*_b) / _n2;
            t -= dt;
            if(dt > -0.00001 && dt < 0.00001){
                mid = 1;
                break;
            }
        }
        if(mid == 1 && _zeta >= 0.0){
            float _m = sqrt(_u * _u + _v * _v);
            float _l1 = horner(t, L1) - _zeta * tanf1;
            float _l2 = horner(t, L2) - _zeta * tanf2;
            //penumbra
            if((_m - _l1) < THRESHOLD && (_m - _l1) > -THRESHOLD2){
                gl_FragColor = vec4(0.0, 0.0, 0.8, 1.0 );
                pathFound = 1;
            }else if(_l2 > 0.0 && (_m - _l2) < THRESHOLD && (_m - _l2) > -THRESHOLD2){ // cincin
                gl_FragColor = vec4(0.8, 0.0, 0.0, 1.0 );
                pathFound = 1;
            }else if(_l2 < 0.0 && (_m + _l2) < THRESHOLD && (_m + _l2) > -THRESHOLD2){ // total
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 );
                pathFound = 1;
            }
        }
    }
    
    if(pathFound == 0){
        float theta = mu + lon;
        float xi = C * cosLat * sin(theta);
        float eta = S * sinLat * cosd - C * cosLat * sind * cos(theta);
        float zeta = S * sinLat * sind + C * cosLat * cosd * cos(theta);
        float u = x - xi;
        float v = y - eta;
        float m = sqrt(u * u + v * v);
        float L1 = l1 - zeta * tanf1;
        float L2 = l2 - zeta * tanf2;
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
}