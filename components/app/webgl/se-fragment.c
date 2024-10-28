const float THRESHOLD = 0.0015;
const float THRESHOLD2 = 0.0025;

struct TElement{
    // float x;
    // float y;
    // float mu;
    // float d;
    // float dx;
    // float dy;
    // float dmu;
    // float dd;

    float d;
    float l1;
    float l2;
    float a;
    float b;
    float u;
    float v;
    float n2;
    float zeta;
    float dmu;
    float theta;
};
struct TLocData{
    float lat;
    float lon;
    float rhoC;
    float rhoS;
};
TLocData loc;

// uniform float esq;
// uniform float mu;
// uniform float x;
// uniform float y;
// uniform float cosd;
// uniform float sind;
// uniform float l1;
// uniform float l2;

uniform float tanF1;
uniform float tanF2;
uniform float time;
uniform float deltaTMu;
uniform int isAe;
uniform int isPath;
uniform int isShadow;

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

TElement calcElem(float t){
    TElement result;
    float x = horner(t, X);
    float y = horner(t, Y);
    float d = horner(t, D);
    float mu = horner(t, MU);
    float dx = horner(t, DX);
    float dy = horner(t, DY);
    float dd = horner(t, DD);
    float dmu = horner(t, DMU);
    float l1 = horner(t, L1);
    float l2 = horner(t, L2);
    
    float theta = mu + loc.lon;
    float xi = loc.rhoC * sin(theta);
    float eta = loc.rhoS * cos(d) - loc.rhoC * sin(d) * cos(theta);
    float zeta = loc.rhoS * sin(d) + loc.rhoC * cos(d) * cos(theta);
    float u = x - xi;
    float v = y - eta;
    float dxi = dmu * loc.rhoC * cos(theta);
    float deta = dmu * xi * sin(d) - zeta * dd;
    
    float a = dx - dxi;
    float b = dy - deta;
    float n2 = a*a + b*b;

    result.d = d;
    result.a = a;
    result.b = b;
    result.u = u;
    result.v = v;
    result.zeta = zeta;
    result.n2 = n2;
    result.l1 = l1 - zeta * tanF1;
    result.l2 = l2 - zeta * tanF1;
    result.theta = theta;
    result.dmu = dmu;
    return result;
}

void main(void){
    vec2 position = -1.0 + 2.0 * vUv;
    loc.lat = radians(position.y * 90.0);
    loc.lon = radians(position.x * 180.0);
    vec2 pos = vec2(vUv.x, vUv.y);
    if(isAe == 1){
        float r = sqrt(position.y*position.y+position.x*position.x);
        loc.lat = radians(90.0 - 180.0*r);    
        loc.lon = atan(position.y,position.x);        
        pos.x = loc.lon / 3.14159 / 2.0 + 0.5;
        pos.y = 1.0 - r;
    }
    
    TElement elem;
    vec3 color = texture2D(txtr, pos).rgb;
    float tmp = atan(0.99664719 * tan(loc.lat));
    loc.rhoS = 0.99664719*sin(tmp);
    loc.rhoC = cos(tmp);

    gl_FragColor = vec4( color.x, color.y, color.z, 1.0 );
    int pathFound = 0;
    if(isPath == 1){
        float t = 0.0;
        float dt = 0.0;
        int mid = 0;
        for(int it=0; it < 15; it++){
            elem = calcElem(t);
            dt = (elem.u*elem.a + elem.v*elem.b) / elem.n2;
            t -= dt;
            if(dt > -0.00001 && dt < 0.00001){
                mid = 1;
                break;
            }
        }
        if(mid == 1 && elem.zeta >= 0.0){
            float m = sqrt(elem.u * elem.u + elem.v * elem.v);
            if((m - elem.l1) < THRESHOLD && (m - elem.l1) > -THRESHOLD2){ // penumbra
                gl_FragColor = vec4(0.0, 0.0, 0.8, 1.0 );
                pathFound = 1;
            }else if(elem.l2 > 0.0 && (m - elem.l2) < THRESHOLD && (m - elem.l2) > -THRESHOLD2){ // cincin
                gl_FragColor = vec4(0.8, 0.0, 0.0, 1.0 );
                pathFound = 1;
            }else if(elem.l2 < 0.0 && (m + elem.l2) < THRESHOLD && (m + elem.l2) > -THRESHOLD2){ // total
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 );
                pathFound = 1;
            }
        }

        // terbit terbenam
        float _acosH0;
        float _h0;
        for(float riset=-1.0; riset<=1.1; riset+=2.0){
            if(pathFound == 0){
                t = 0.0;
                mid = 0;
                for(int it=0; it<=5; it++){
                    elem = calcElem(t);
                    _acosH0 = (sin(-0.00524) - sin(loc.lat)*sin(elem.d))/(cos(loc.lat)*cos(elem.d));
                    if(_acosH0 > 1.0 || _acosH0 < -1.0){
                        break;
                    }
                    _h0 = acos(_acosH0);
                    dt = (riset * _h0 - elem.theta)/elem.dmu;
                    while(dt >= 12.0) dt -= 24.0;
                    while(dt <= -12.0) dt += 24.0;
                    t += dt;
                    if(dt > -0.0001 && dt < 0.0001){
                        mid = 1;
                        break;
                    }
                }
                if(mid == 1){
                    float m = sqrt(elem.u * elem.u + elem.v * elem.v);
                    if((m - elem.l1) < 2.0*THRESHOLD && (m - elem.l1) > -2.0*THRESHOLD2){
                        gl_FragColor = vec4(0.0, 0.8, 8.0, 1.0 );
                        pathFound = 1;
                    }
                }
            }
        }
    }
    
    if(isShadow == 1){
        if(pathFound == 0){
            elem = calcElem(time);
            float m = sqrt(elem.u * elem.u + elem.v * elem.v);
            float L1 = elem.l1;
            float L2 = elem.l2;
            if (elem.zeta < 0.0){
                float fac = 0.4;
                gl_FragColor = vec4(color.x * fac, color.y * fac, color.z * fac, 1.0 );
            } else if (L2 < 0.0 && m < -L2){
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 );
            } else if (L2 > 0.0 && m < L2){
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0 );
            } else if (m < L1){
                float f = 0.7 - 0.0 * (L1 - m) / L1;
                gl_FragColor = vec4(color.x * f, color.y * f, color.z * f, 1.0 );
            } else{
                gl_FragColor = vec4( color.x, color.y, color.z, 1.0 );
            }
        }
    }
    
}